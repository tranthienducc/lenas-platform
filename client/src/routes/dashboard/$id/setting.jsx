import SettingsPage from "@/pages/dashboard/SettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$id/setting")({
  component: SettingsPage,
});
