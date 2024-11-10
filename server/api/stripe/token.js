import { withMiddleware } from "../../src/lib/middleware/withMiddleware.js";
import { stripe } from "../../src/lib/stripe/index.js";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: code,
    });

    return res.json(response);
  } catch (error) {
    console.error("🔴 Error", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export default withMiddleware(handler);
