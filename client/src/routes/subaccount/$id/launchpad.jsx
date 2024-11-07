import LaunchpadPage from "@/pages/dashboard/LaunchpadPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/launchpad")({
  component: LaunchpadPage,
});
