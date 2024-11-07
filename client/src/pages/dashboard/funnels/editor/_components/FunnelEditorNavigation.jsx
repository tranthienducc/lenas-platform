import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { upsertFunnelPage } from "@/lib/actions/funnels/upsert- funnelpage";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { useEditor } from "@/providers/editor/editor-provider";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import {
  ArrowLeftCircle,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { toast } from "sonner";

const FunnelEditorNavigation = ({
  funnelsId,
  funnelPageDetails,
  subAccountId,
  refetch,
}) => {
  const { state, dispatch } = useEditor();

  useEffect(() => {
    dispatch({
      type: "SET_FUNNELPAGE_ID",
      payload: { funnelPageId: funnelPageDetails?.id },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [funnelPageDetails]);

  const handleOnBlurTitleChange = async (event) => {
    if (event.target.value === funnelPageDetails.name) return;
    if (event.target.value) {
      await upsertFunnelPage(
        subAccountId,
        {
          id: funnelPageDetails.id,
          name: event.target.value,
          order: funnelPageDetails.order,
        },
        funnelsId
      );

      toast("Success", {
        description: "Save funnel page title",
      });

      refetch();
    } else {
      toast("Failed", {
        description: "You need to have a title!",
      });

      event.target.value = funnelPageDetails.name;
    }
  };

  const handleClickPreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  const handleOnSave = async () => {
    const content = JSON.stringify(state.editor.elements);
    try {
      const response = await upsertFunnelPage(
        subAccountId,
        { ...funnelPageDetails, content },
        funnelsId
      );

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subAccountId: subAccountId,
      });
      toast.success("Save editor successfully");
    } catch (error) {
      console.log(error);
      toast.error("Could not save editor!");
    }
  };

  return (
    <TooltipProvider>
      <nav
        className={clsx(
          "border-b flex items-center justify-between p-4 gap-2 transition-all bg-[#000]",
          { "!h-0 !p-0 !overflow-hidde": state.editor.previewMode }
        )}
      >
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px]">
          <Link to={`/subaccount/${subAccountId}/funnel/${funnelsId}`}>
            <ArrowLeftCircle />
          </Link>
          <div className="flex flex-col w-full">
            <Input
              defaultValue={funnelPageDetails?.name}
              className="h-5 p-0 m-0 text-lg border-none"
              onClick={handleOnBlurTitleChange}
            />
            <span className="text-sm text-muted-foreground">
              Path: {funnelPageDetails?.pathName}
            </span>
          </div>
        </aside>
        <aside>
          <Tabs
            defaultValue="Desktop"
            className="w-fit"
            value={state.editor.device}
            onValueChange={(value) =>
              dispatch({ type: "CHANGE_DEVICE", payload: { device: value } })
            }
          >
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Desktop"
                    className="data-[state=active]:bg-muted size-10 p-0"
                  >
                    <Laptop />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>Desktop</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Tablet"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Tablet />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="Mobile"
                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                  >
                    <Smartphone />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TabsList>
          </Tabs>
        </aside>
        <aside className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hover:bg-slate-500"
            onClick={handleClickPreview}
          >
            <EyeIcon />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={!(state.history.currentIndex > 0)}
            className="hover:bg-slate-800"
            onClick={handleUndo}
          >
            <Undo2 />
          </Button>
          <Button
            type="button"
            disabled={
              !(state.history.currentIndex < state.history.history.length - 1)
            }
            onClick={handleRedo}
            variant="ghost"
            size="icon"
            className="mr-4 hover:bg-slate-800"
          >
            <Redo2 />
          </Button>
          <div className="flex flex-col mr-4">
            <div className="flex flex-row items-center gap-4">
              Draft
              <Switch
                disabled
                defaultChecked={true}
                className="data-[state=checked]:bg-[#0142db]"
              />
              Publish
            </div>
            <span className="text-sm text-muted-foreground">
              Last updated{" "}
              {new Date(funnelPageDetails?.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <Button onClick={handleOnSave}>Save</Button>
        </aside>
      </nav>
    </TooltipProvider>
  );
};

export default FunnelEditorNavigation;

FunnelEditorNavigation.propTypes = {
  funnelsId: PropTypes.string,
  funnelPageDetails: PropTypes.any,
  subAccountId: PropTypes.string,
  refetch: PropTypes.func,
};
