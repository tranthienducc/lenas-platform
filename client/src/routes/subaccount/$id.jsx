import SubAccountPage from "@/pages/subaccount/SubAccountPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id")({
  component: SubAccountPage,
});
