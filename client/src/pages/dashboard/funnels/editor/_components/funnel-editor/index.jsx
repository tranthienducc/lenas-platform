import { Button } from "@/components/ui/button";
import { getFunnelPageUnique } from "@/lib/actions/funnels/get-funnel-page-unique";
import DraggableEditorContainer from "@/pages/dashboard/funnels/editor/_components/DraggableEditorContainer";
import { Recursive } from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/index";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const FunnelEditor = ({ funnelPageId, liveMode }) => {
  const { dispatch, state } = useEditor();
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [dispatch, liveMode]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFunnelPageUnique(funnelPageId);
      if (!response) return;

      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response?.[0].content
            ? JSON.parse(response?.[0].content)
            : "",
          withLive: !!liveMode,
        },
      });
    };

    fetchData();
  }, [dispatch, funnelPageId, liveMode]);

  const handleClick = () => {
    dispatch({ type: "CHANGE_CLICKED_ELEMENT", payload: {} });
  };

  const handleUnPreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  console.log("FunnelEditor-funnelPageID", funnelPageId);

  return (
    <DraggableEditorContainer zoom={zoom} setZoom={setZoom}>
      <div
        className={clsx(
          "automation-zoom-in h-screen max-w-[1920px] overflow-scroll mr-[385px] transition-all rounded-lg",
          {
            "!p-0 !mr-0":
              state.editor.previewMode === true ||
              state.editor.liveMode === true,
            "!w-[850px]": state.editor.device === "Tablet",
            "!w-[420px]": state.editor.device === "Mobile",
            "!w-full": state.editor.device === "Desktop",
          }
        )}
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: "center",
        }}
        onClick={handleClick}
      >
        {state.editor.previewMode && state.editor.liveMode && (
          <Button
            variant="ghost"
            size="icon"
            className="size-6 bg-white p-[2px] fixed top-0 left-0 z-[100]"
            onClick={handleUnPreview}
          >
            <EyeOff />
          </Button>
        )}

        {Array.isArray(state.editor.elements) &&
          state.editor.elements.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </div>
    </DraggableEditorContainer>
  );
};

export default FunnelEditor;

FunnelEditor.propTypes = {
  funnelPageId: PropTypes.string,
  liveMode: PropTypes.bool,
};
