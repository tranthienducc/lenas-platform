import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export const getStripe = (connectedAccountId) => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {
      stripeAccount: connectedAccountId,
    });
  }

  return stripePromise;
};
