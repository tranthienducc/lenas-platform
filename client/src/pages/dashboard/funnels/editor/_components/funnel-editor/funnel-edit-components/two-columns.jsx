import { Badge } from "@/components/ui/badge";
import { defaultStyles } from "@/constants";
import Recursive from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/Recursive";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import PropTypes from "prop-types";
import { v4 } from "uuid";

const TwoColumns = ({ element }) => {
  const { dispatch, state } = useEditor();

  const handleOnDrop = (e) => {
    e.stopPropagation();

    const componentType = e.dataTransfer.getData("componentType");

    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: element.id,
            elementDetails: {
              content: { innerText: "Text Component" },
              id: v4(),
              name: "Text",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "text",
            },
          },
        });
        break;
      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: element.id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Container",
              styles: { ...defaultStyles },
              type: "container",
            },
          },
        });
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: element.id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Two Columns",
              styles: { ...defaultStyles },
              type: "2Col",
            },
          },
        });
        break;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, type) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      style={element.styles}
      className={clsx("relative p-4 transition-all", {
        "h-fit": element.type === "container",
        "h-full": element.type === "__body",
        "m-4": element.type === "container",
        "!border-blue-500":
          state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode,
        "!border-solid":
          state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode,
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      id="innerContainer"
      onDrop={(e) => handleOnDrop(e, element.id)}
      onDragOver={handleDragOver}
      draggable={element.type !== "__body"}
      onDragStart={(e) => handleDragStart(e, "container")}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg bg-black text-white">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {Array.isArray(element.content) &&
        element.content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default TwoColumns;

TwoColumns.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
        })
      ),
      PropTypes.shape({
        href: PropTypes.string,
        innerText: PropTypes.string,
        src: PropTypes.string,
      }),
    ]),
    name: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.string,
  }),
};
