import SubdomainPage from "@/pages/domain/SubdomainPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$domain")({
  component: SubdomainPage,
});
