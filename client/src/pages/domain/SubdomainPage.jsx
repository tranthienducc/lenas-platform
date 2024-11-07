import NotFoundPage from "@/components/NotFoundPage";
import { useUpdateVisitsPage } from "@/lib/tanstack-query/mutations";
import { useGetDomainContent } from "@/lib/tanstack-query/queries";
import FunnelEditor from "@/pages/dashboard/funnels/editor/_components/funnel-editor";
import EditorProvider from "@/providers/editor/editor-provider";
import { useEffect } from "react";

const SubdomainPage = () => {
  const hostname = window.location.hostname;
  const subdomain = hostname.split(".")[0];
  const { data: domainData, isLoading, error } = useGetDomainContent(subdomain);
  const { mutate: updateVisits } = useUpdateVisitsPage();
  const pageData = domainData?.FunnelPage?.find((page) => !page.pathName);

  console.log("domainData", pageData);

  useEffect(() => {
    if (pageData?.id) {
      updateVisits(pageData?.id);
    }
  }, [pageData?.id, updateVisits]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !domainData) {
    return <NotFoundPage />;
  }

  return (
    <EditorProvider
      subAccountId={domainData?.subAccountId}
      pageDetails={pageData}
      funnelId={domainData?.id}
    >
      <FunnelEditor funnelPageId={pageData?.id} liveMode={true} />
    </EditorProvider>
  );
};

export default SubdomainPage;
