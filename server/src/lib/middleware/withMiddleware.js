import { corsOptions, authMiddleware, pathMatcher } from "./middleware";
import dotenv from "dotenv";

dotenv.config();

export function withMiddleware(handler) {
  return async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      corsOptions.methods.join(",")
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      corsOptions.allowedHeaders.join(",")
    );

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    try {
      await new Promise((resolve, reject) => {
        pathMatcher(req, res, (error) => {
          if (error) reject(error);
          resolve();
        });
      });

      await new Promise((resolve, reject) => {
        authMiddleware(req, res, (error) => {
          if (error) reject(error);
          resolve();
        });
      });

      if (req.body && typeof req.body === "string") {
        req.body = JSON.parse(req.body);
      }

      return handler(req, res);
    } catch (error) {
      console.error("Middleware error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
