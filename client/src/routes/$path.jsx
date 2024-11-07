import SlugPage from "@/pages/domain/path/SlugPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$path")({
  component: SlugPage,
});
