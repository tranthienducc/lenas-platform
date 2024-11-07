import ContactPage from "@/pages/subaccount/contact/ContactPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/subaccount/$id/contact")({
  component: ContactPage,
});
