import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabList from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab";
import LayersTab from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/LayersTab";
import MediaBucketTab from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/MediaBucketTab";
import SettingsTab from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/SettingsTab";
import TabComponents from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import PropTypes from "prop-types";

const FunnelEditorSidebar = ({ subAccountId }) => {
  const { state } = useEditor();
  return (
    <Sheet open={true} modal={false}>
      <Tabs defaultValue="Settings" className="w-full">
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[81px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden",
            {
              hidden: state.editor.previewMode,
            }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          showX={false}
          className={clsx(
            "mt-[81px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden",
            {
              hidden: state.editor.previewMode,
            }
          )}
          side="right"
        >
          <div className="grid h-full gap-4 overflow-scroll pb-36">
            <TabsContent value="Settings">
              <SheetHeader className="px-6 pt-4 pb-6 text-left">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  {" "}
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              <SettingsTab />
            </TabsContent>
            <TabsContent value="Layers">
              <SheetHeader className="px-6 pt-4 pb-6 text-left">
                <SheetTitle>Layers</SheetTitle>
                <SheetDescription>
                  View the editor in a tree like structure.
                </SheetDescription>
              </SheetHeader>
              <LayersTab />
            </TabsContent>
            <TabsContent value="Media">
              <MediaBucketTab subAccountId={subAccountId} />
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="px-6 pt-4 pb-6 text-left">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  You can drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <TabComponents />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default FunnelEditorSidebar;

FunnelEditorSidebar.propTypes = {
  subAccountId: PropTypes.string,
};
