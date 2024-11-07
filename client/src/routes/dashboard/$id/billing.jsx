import BilingPage from "@/pages/dashboard/billing/BilingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$id/billing")({
  component: BilingPage,
});
