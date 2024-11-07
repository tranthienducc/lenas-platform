import Funnels from "@/pages/dashboard/funnels/Funnels";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/funnels")({
  component: Funnels,
});
