import { DashboardLayout } from "@/layout/dashboard/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$id")({
  component: DashboardLayout,
});
