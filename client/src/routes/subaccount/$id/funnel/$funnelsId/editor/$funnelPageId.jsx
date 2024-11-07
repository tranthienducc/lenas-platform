import FunnelEditorPage from "@/pages/dashboard/funnels/editor/FunnelEditorPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId"
)({
  component: FunnelEditorPage,
});
