import { stripe } from "@/lib/stripe";

export async function createCustomer({ address, email, name, shipping }) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      address,
      shipping,
    });

    const customerId = customer.id;

    return customerId;
  } catch (error) {
    console.log("🔴 Error", error);
  }
}
