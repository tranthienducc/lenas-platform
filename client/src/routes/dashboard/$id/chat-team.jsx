import TeamPage from "@/pages/dashboard/team/TeamPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$id/chat-team")({
  component: TeamPage,
});
