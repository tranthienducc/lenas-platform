import { Badge } from "@/components/ui/badge";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";

const VideoComponent = ({ element }) => {
  const { state, dispatch } = useEditor();

  const handleDragStart = (e, type) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnclick = (e) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      style={element.styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      onClick={handleOnclick}
      className={clsx(
        "p-2 w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,
          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg bg-black text-white">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      {!Array.isArray(element.content) && (
        <iframe
          width={element.styles?.width || "560"}
          height={element.styles?.height || "315"}
          src={element.content?.src}
          title="Youtube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-black text-white px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default VideoComponent;

VideoComponent.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.shape({
      href: PropTypes.string,
      innerText: PropTypes.string,
      src: PropTypes.string,
    }),
    name: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.string,
  }),
};
