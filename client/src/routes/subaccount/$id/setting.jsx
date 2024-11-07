import SettingsPage from "@/pages/dashboard/SettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/setting")({
  component: SettingsPage,
});
