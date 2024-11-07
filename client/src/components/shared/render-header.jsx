import Header from "@/components/shared/header";
import { useRouter } from "@tanstack/react-router";

const RenderHeader = () => {
  const router = useRouter();
  const showHeaderRoutes = [
    "/dashboard/site-manage",
    "/dashboard",
    "/dashboard/ai",
    "/dashboard/site-manage",
    "/dashboard/chat-team",
    "/dashboard/settings",
    "/login",
    "/subaccount",
  ];

  const shouldShowHeader = !showHeaderRoutes.some((route) =>
    router.state.location.pathname.startsWith(route)
  );

  return <>{shouldShowHeader && <Header />}</>;
};

export default RenderHeader;
