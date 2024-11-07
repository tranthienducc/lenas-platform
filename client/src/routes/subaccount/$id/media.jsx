import MediaPage from "@/pages/subaccount/MediaPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/media")({
  component: MediaPage,
});
