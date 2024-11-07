import EditProfle from "@/pages/profile/EditProfle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/edit-profile/$id")({
  component: EditProfle,
});
