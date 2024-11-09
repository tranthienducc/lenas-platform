import DrawToolPage from "@/features/draw/DrawToolPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/draw")({
  component: DrawToolPage,
});
