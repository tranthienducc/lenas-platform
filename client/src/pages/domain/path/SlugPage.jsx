import NotFoundPage from "@/components/NotFoundPage";
import { useGetDomainContent } from "@/lib/tanstack-query/queries";
import FunnelEditor from "@/pages/dashboard/funnels/editor/_components/funnel-editor";
import EditorProvider from "@/providers/editor/editor-provider";
import { useParams } from "@tanstack/react-router";

const SlugPage = () => {
  const { domain, path } = useParams({ strict: false });
  const { data: domainData } = useGetDomainContent(domain.slice(0, -1));
  const pageData = domainData?.FunnelPages.find(
    (page) => page.pathName === path
  );

  if (!domainData || !pageData) {
    return <NotFoundPage />;
  }

  return (
    <EditorProvider
      subAccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor funnelPageId={pageData.id} liveMode={true} />
    </EditorProvider>
  );
};

export default SlugPage;
