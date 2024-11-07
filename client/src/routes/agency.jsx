import AgencyPage from "@/pages/AgencyPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agency")({
  component: AgencyPage,
});
