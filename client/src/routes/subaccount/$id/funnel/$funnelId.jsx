import FunnelsPage from "@/pages/dashboard/funnels/id/FunnelsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/funnel/$funnelId")({
  component: FunnelsPage,
});
