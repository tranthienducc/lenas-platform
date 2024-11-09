import Header from "@/components/shared/header";
import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";

const RenderHeader = () => {
  const router = useRouterState();

  const hideHeaderPattern = useMemo(() => {
    return /^\/(dashboard|login|subaccount)(\/|$)/;
  }, []);

  const shouldShowHeader = !hideHeaderPattern.test(router.location.pathname);

  return shouldShowHeader ? <Header /> : null;
};

export default RenderHeader;
