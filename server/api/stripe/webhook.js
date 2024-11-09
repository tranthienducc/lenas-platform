import { stripe } from "../../src/lib/stripe/index.js";
import { subscriptionCreated } from "../../src/lib/stripe/stripeActions.js";

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const webhookSecret =
    process.env.SERVER_STRIPE_WEBHOOK_SECRET ??
    process.env.SERVER_STRIPE_WEBHOOK_SECRET_LIVE;

  try {
    if (!sig || !webhookSecret) {
      return res
        .status(400)
        .json({ error: "Stripe webhook secret or signature missing" });
    }

    const payload = req.body;
    const stripeEvent = stripe.webhooks.constructEvent(
      payload,
      sig,
      webhookSecret
    );

    if (stripeWebhookEvents.has(stripeEvent.type)) {
      const subscription = stripeEvent.data.object;

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
    console.error("🔴 Error", error.message);
    return res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }
}
