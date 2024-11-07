import DashboardSub from "@/pages/subaccount/DashboardSub";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/dashboard")({
  component: DashboardSub,
});
