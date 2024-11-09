import LaunchpadPage from "@/pages/subaccount/LaunchpadPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/launchpad")({
  component: LaunchpadPage,
});
