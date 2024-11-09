import { Badge } from "@/components/ui/badge";
import { defaultStyles } from "@/constants";
import Recursive from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/recursive";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

const Container = ({ element }) => {
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
              content: { innerText: "Text Element" },
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
      case "link":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: element.id,
            elementDetails: {
              content: { innerText: "Link Element", href: "#" },
              id: v4(),
              name: "Link",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "link",
            },
          },
        });

        break;
      case "video":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: element.id,
            elementDetails: {
              content: {
                src: "https://www.youtube.com/embed/wwg4oX688nc",
              },
              id: v4(),
              name: "Video",
              styles: {},
              type: "video",
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

      case "contactForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: element.id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "contactForm",
            },
          },
        });
        break;
      case "paymentForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: element.id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "paymentForm",
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
              content: [
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%" },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Two Columns",
              styles: {
                ...defaultStyles,
                display: "flex",
              },
              type: "2Col",
            },
          },
        });
        break;
      default:
        break;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, type) => {
    if (type === "__body") return;
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
      className={clsx("relative p-4 transition-all group", {
        "max-w-full w-full":
          element.type === "container" || element.type === "2Col",
        "h-fit": element.type === "container",
        "h-full": element.type === "__body",
        "overflow-scroll": element.type === "__body",
        "flex flex-col md:!flex-row": element.type === "2Col",
        "!border-blue-500":
          state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-4":
          state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!border-solid":
          state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode,
        "border-dashed border border-slate-300": !state.editor.liveMode,
      })}
      onDrop={(e) => handleOnDrop(e, element.id)}
      onDragOver={handleDragOver}
      draggable={element.type !== "__body"}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
    >
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden bg-black text-white",
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </Badge>

      {Array.isArray(element.content) &&
        element.content?.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="absolute bg-black text-white px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg">
            <Trash onClick={handleDeleteElement} size={16} />
          </div>
        )}
    </div>
  );
};

export default Container;

Container.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.array,
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
