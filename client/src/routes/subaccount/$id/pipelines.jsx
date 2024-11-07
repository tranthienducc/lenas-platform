import Pipeline from "@/pages/subaccount/pipelines/Pipeline";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/pipelines")({
  component: Pipeline,
});
