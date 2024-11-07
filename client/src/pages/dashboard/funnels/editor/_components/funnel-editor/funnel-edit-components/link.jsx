import { Badge } from "@/components/ui/badge";
import { useEditor } from "@/providers/editor/editor-provider";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import DOMPurify from "dompurify";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

const LinkComponent = ({ element }) => {
  const { dispatch, state } = useEditor();
  const [content, setContent] = useState(
    (!Array.isArray(element.content) && element.content.innerText) || ""
  );
  const spanRef = useRef(null);
  const santizedContent = DOMPurify.sanitize(content);

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

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleInput = (e) => {
    const newContent = e.currentTarget.TextContent;
    setContent(newContent);
  };

  const onBlur = () => {
    if (spanRef.current) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          elementDetails: {
            ...element,
            content: {
              innerText: spanRef.current.innerText,
            },
          },
        },
      });
    }
  };

  return (
    <div
      style={element.styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "text")}
      onClick={handleOnClickBody}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,

          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg bg-black text-white">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      {!Array.isArray(element.content) &&
        (state.editor.previewMode || state.editor.liveMode) && (
          <Link to={element.content.href || "#"}>
            {element.content.innerText}
          </Link>
        )}
      {!state.editor.previewMode && !state.editor.liveMode && (
        <span
          contentEditable={!state.editor.liveMode}
          onBlur={onBlur}
          ref={spanRef}
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: santizedContent }}
          className="text-white dark:text-black"
        />
      )}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute  bg-black text-white px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg">
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

export default LinkComponent;

LinkComponent.propTypes = {
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
