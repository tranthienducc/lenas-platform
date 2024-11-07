import { useGetFunnelPage } from "@/lib/tanstack-query/queries";
import FunnelEditor from "@/pages/dashboard/funnels/editor/_components/funnel-editor";
import FunnelEditorSidebar from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/FunnelEditorSidebar";
import FunnelEditorNavigation from "@/pages/dashboard/funnels/editor/_components/FunnelEditorNavigation";
import EditorProvider from "@/providers/editor/editor-provider";
import { useParams } from "@tanstack/react-router";

const FunnelEditorPage = () => {
  const { id, funnelsId, funnelPageId } = useParams({ strict: false });

  const { data: funnelPageDetails, refetch } = useGetFunnelPage(funnelPageId);

  console.log("funneslId", funnelPageDetails);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        subAccountId={id}
        funnelsId={funnelsId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelsId={funnelsId}
          funnelPageDetails={funnelPageDetails}
          subAccountId={id}
          refetch={refetch}
        />

        <div className="flex justify-center h-full">
          <FunnelEditor funnelPageId={funnelPageId} />
        </div>

        <FunnelEditorSidebar subAccountId={id} />
      </EditorProvider>
    </div>
  );
};

export default FunnelEditorPage;
