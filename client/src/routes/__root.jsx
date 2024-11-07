import RenderHeader from "@/components/shared/render-header";
import SubdomainPage from "@/pages/domain/SubdomainPage";
import { createRootRoute, Outlet } from "@tanstack/react-router";

function RootComponent() {
  // Lấy hostname hiện tại
  const hostname = window.location.hostname;

  const isSubdomain =
    hostname.split(".").length > 2 ||
    (hostname !== "localhost" && hostname !== "your-main-domain.com");

  if (isSubdomain) {
    return <SubdomainPage />;
  }

  return (
    <>
      <RenderHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export const Route = new createRootRoute({
  component: RootComponent,
});
