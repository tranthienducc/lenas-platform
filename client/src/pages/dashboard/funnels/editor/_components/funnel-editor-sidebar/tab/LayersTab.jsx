import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useEditor } from "@/providers/editor/editor-provider";
import PropTypes from "prop-types";

const ElementType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  styles: PropTypes.object,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
});

ElementType.content = PropTypes.arrayOf(ElementType);

const LayersTab = () => {
  const { state } = useEditor();

  return (
    <Accordion type="multiple" className="w-full" defaultValue={["Body"]}>
      <AccordionItem value="Body" className="px-6 py-0">
        <AccordionContent className="flex flex-wrap gap-2">
          <Accordion type="multiple" className="w-full">
            <RecursiveAccordion elements={state.editor.elements} />
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LayersTab;

function RecursiveAccordion({ elements, depth = 0 }) {
  const { dispatch, state } = useEditor();

  const handleElementClick = (e) => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: e,
      },
    });
  };

  return (
    <>
      {Array.isArray(elements) &&
        elements?.map((element) => (
          <AccordionItem
            key={element.id}
            value={element.name}
            className="border-y-[1px]"
          >
            <AccordionTrigger
              className={cn(
                "hover:bg-black/60 text-sm px-4 py-2 rounded-md border-none",

                state.editor.selectedElement.id === element.id
                  ? "bg-[#808389]"
                  : ""
              )}
              onClick={() => handleElementClick(element)}
            >
              <div className="flex items-center w-full">
                <DeepIndicator depth={depth} />
                <div className="flex items-center gap-2 ml-2">
                  <div className="border-2 border-dashed border-slate-300 size-3" />
                  <span className="text-muted-foreground">{element.name}</span>
                  {element.type && element.type !== "__body" && (
                    <span className="text-xs text-slate-500">
                      ({element.name})
                    </span>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            {element.content && Array.isArray(element.content) && (
              <AccordionContent className="ml-2">
                <RecursiveAccordion
                  elements={element.content}
                  depth={depth + 1}
                />
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
    </>
  );
}

RecursiveAccordion.propTypes = {
  depth: PropTypes.number,
  elements: PropTypes.arrayOf(ElementType).isRequired,
};

function DeepIndicator({ depth }) {
  if (depth === 0) return null;

  return (
    <div className="flex items-center">
      {[
        ...Array(depth).map((_, index) => (
          <div
            key={index}
            className="ml-2 border-l-2 border-dashed size-4 border-slate-200"
          />
        )),
      ]}
    </div>
  );
}

DeepIndicator.propTypes = {
  depth: PropTypes.number,
};
