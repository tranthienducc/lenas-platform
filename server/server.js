const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { stripe } = require("./lib/stripe/index.js");
const Stripe = require("stripe");
const BodyParser = require("body-parser");
const { subscriptionCreated } = require("./lib/stripe/stripeActions.js");
const {
  pathMatcher,
  corsOptions,
  authMiddleware,
} = require("./lib/middleware/middleware.js");

const app = express();

const stripeWebhookEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret =
      process.env.SERVER_STRIPE_WEBHOOK_SECRET ??
      process.env.SERVER_STRIPE_WEBHOOK_SECRET_LIVE;

    try {
      if (!sig || !webhookSecret) {
        console.log(
          "🔴 Error Stripe webhook secret or the signature does not exist."
        );
        return res.status(400).json({
          error: "Stripe webhook secret or signature missing",
        });
      }

      // Chuyển body thành chuỗi nếu nó là buffer
      const payload = req.body.toString();

      const stripeEvent = stripe.webhooks.constructEvent(
        payload,
        sig,
        webhookSecret
      );

      if (stripeWebhookEvents.has(stripeEvent.type)) {
        const subscription = stripeEvent.data.object;
        console.log("subscription-id", subscription.customer);

        if (
          !subscription.metadata.connectAccountPayments &&
          !subscription.metadata.connectAccountSubscriptions
        ) {
          switch (stripeEvent.type) {
            case "customer.subscription.created":
            case "customer.subscription.updated": {
              if (subscription.status === "active") {
                const response = await subscriptionCreated(
                  subscription,
                  subscription.customer
                );

                console.log("CREATED FROM WEBHOOK 💳", subscription, response);
              } else {
                console.log(
                  "SKIPPED AT CREATED FROM WEBHOOK 💳 because subscription status is not active",
                  subscription
                );
              }
              break;
            }
            default:
              console.log("👉🏻 Unhandled relevant event!", stripeEvent.type);
          }
        } else {
          console.log(
            "SKIPPED FROM WEBHOOK 💳 because subscription was from a connected account not for the application",
            subscription
          );
        }
      }

      return res.json({ received: true });
    } catch (error) {
      console.log(`🔴 Error ${error.message}`);
      return res.status(400).json({
        error: `Webhook Error: ${error.message}`,
      });
    }
  }
);

app.post("/api/stripe/create-checkout-session", async (req, res) => {
  const { subAccountConnectAccId, prices, subAccountId } = req.body;

  const subscriptionFeePercent =
    process.env.SERVER_PLATFORM_SUBSCRIPTION_PERSENT;
  const oneTimeFee = process.env.SERVER_PLATFORM_ONETIME_FEE;
  const agencyPercent = process.env.SERVER_PLATFORM_AGENCY_PERSENT;

  if (
    !subAccountConnectAccId ||
    !prices?.length ||
    !subscriptionFeePercent ||
    !oneTimeFee ||
    !agencyPercent
  ) {
    return res
      .status(400)
      .json({ error: "Missing important information or valid value" });
  }

  const subscriptionPriceExists = prices?.find((price) => price.recurring);

  try {
    const session = await stripe.checkout.sessions.create(
      {
        line_items: prices?.map((price) => ({
          price: price?.productId,
          quantity: 1,
        })),
        ...(subscriptionPriceExists && {
          payment_intent_data: {
            metadata: { connectAccountPayments: "true" },
            application_fee_amount: +oneTimeFee * 100,
          },
        }),
        mode: subscriptionPriceExists ? "subscription" : "payment",
        success_url: `${process.env.SERVER_CLIENT_URL}/success`,
        cancel_url: `${process.env.SERVER_CLIENT_URL}/cancel`,
      },
      { stripeAccount: subAccountConnectAccId }
    );

    res.json({
      clientSecet: session.client_secret,
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/stripe/token", async (req, res) => {
  try {
    const { code } = req.body;

    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: code,
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get Stripe token" });
  }
});

app.use(express.json());
app.use(cors(corsOptions));

app.use(pathMatcher);
app.use(authMiddleware);

app.post("/api/stripe/create-customer", async (req, res) => {
  const { address, email, name, shipping } = req.body;

  if (!email || !address || !name || !shipping) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name,
      address,
      shipping,
    });
    return res.json({ customerId: customer.id });
  } catch (error) {
    console.error("🔴 Error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/stripe/create-subscription", async (req, res) => {
  const { customerId, priceId, subscriptionExists } = req.body;

  if (!customerId || !priceId) {
    return res
      .status(400)
      .json({ error: "Customer Id or price id is missing" });
  }

  try {
    if (
      subscriptionExists?.Subscription?.subscritiptionId &&
      subscriptionExists.Subscription.active
    ) {
      // Update the subscription instead of creating one.
      if (!subscriptionExists.Subscription.subscritiptionId) {
        throw new Error(
          "Could not find the subscription Id to update the subscription."
        );
      }
      console.log("Updating the subscription");
      const currentSubscriptionDetails = await stripe.subscriptions.retrieve(
        subscriptionExists.Subscription.subscritiptionId
      );

      const subscription = await stripe.subscriptions.update(
        subscriptionExists.Subscription.subscritiptionId,
        {
          items: [
            {
              id: currentSubscriptionDetails.items.data[0].id,
              deleted: true,
            },
            { price: priceId },
          ],
          expand: ["latest_invoice.payment_intent"],
        }
      );

      return res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } else {
      console.log("Creating a subscription");
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });

      return res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    }
  } catch (error) {
    console.error("🔴 Error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server đang chạy tại cổng ${PORT}`));
