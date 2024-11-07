import DashManagePage from "@/pages/dashboard/DashManagePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$id/dashboard-manage")({
  component: DashManagePage,
});
