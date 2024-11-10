import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "./src/lib/middleware/middleware.js";

import checkoutHandler from "./api/stripe/create-checkout-session.js";
import customerHandler from "./api/stripe/create-customer.js";
import tokenHandler from "./api/stripe/token.js";
import webhookHandler from "./api/stripe/webhook.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(bodyParser.json());

const adaptHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.post("/api/stripe/checkout", adaptHandler(checkoutHandler));
app.post("/api/stripe/customer", adaptHandler(customerHandler));
app.post("/api/stripe/token", adaptHandler(tokenHandler));
app.post("/api/stripe/webhook", adaptHandler(webhookHandler));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
