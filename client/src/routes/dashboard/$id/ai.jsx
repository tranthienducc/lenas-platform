import AIPage from "@/pages/dashboard/AIPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$id/ai")({
  component: AIPage,
});
