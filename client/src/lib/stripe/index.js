import Stripe from "stripe";

export const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Lenas App",
    version: "0.1.0",
  },
});
