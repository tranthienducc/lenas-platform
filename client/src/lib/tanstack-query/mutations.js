import { updateVisitsFunnelPage } from "@/lib/actions/funnels/update-visit-funnel-page";
import { useMutation } from "@tanstack/react-query";

export const useUpdateVisitsPage = () => {
  return useMutation({
    mutationFn: (funnelPageId) => updateVisitsFunnelPage(funnelPageId),
  });
};
