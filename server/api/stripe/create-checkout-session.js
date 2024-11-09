import { stripe } from "../../src/lib/stripe/index.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

  const subscriptionPriceExists = prices.find((price) => price.recurring);

  try {
    const session = await stripe.checkout.sessions.create(
      {
        line_items: prices.map((price) => ({
          price: price.productId,
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
      clientSecret: session.client_secret,
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: error.message });
  }
}
