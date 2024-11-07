import PricingPage from "@/pages/pricing/PricingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});
