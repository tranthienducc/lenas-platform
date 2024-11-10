import Stripe from "stripe";

const stripe = new Stripe(process.env.SERVER_STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  appInfo: {
    name: "Lenas App",
    version: "0.1.0",
  },
});

export default stripe;
