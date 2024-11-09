import { stripe } from "../../src/lib/stripe/index.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
}
