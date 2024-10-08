import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = new createRootRoute({
  component: () => <Outlet />,
});
