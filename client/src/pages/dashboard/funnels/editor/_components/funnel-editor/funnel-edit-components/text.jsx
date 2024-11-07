import { Badge } from "@/components/ui/badge";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import DOMPurify from "dompurify";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

const TextComponent = ({ element }) => {
  const { dispatch, state } = useEditor();
  const spanRef = useRef(null);
  const [content, setContent] = useState(
    (!Array.isArray(element.content) && element.content.innerText) || ""
  );

  const santizedContent = DOMPurify.sanitize(content);

  const handleDeleteElement = () => {
    dispatch({ type: "DELETE_ELEMENT", payload: { elementDetails: element } });
  };

  const handleInput = (e) => {
    const newContent = e.currentTarget.textContent;

    setContent(newContent);
  };

  const styles = element.styles;

  const handleOnClickBody = (e) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleBlurChange = () => {
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
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all cursor-pointer",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,
          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border border-slate-300": !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
      style={styles}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[22px] -left-[1px] rounded-none rounded-t-lg  text-white bg-black">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <span
        contentEditable={!state.editor.liveMode}
        className="text-white dark:text-black"
        ref={spanRef}
        onBlur={handleBlurChange}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: santizedContent }}
      />
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-black px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
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

export default TextComponent;

TextComponent.propTypes = {
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
