import AllSubaccountPage from "@/pages/dashboard/AllSubaccountPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/$id/all-subaccount")({
  component: AllSubaccountPage,
});
