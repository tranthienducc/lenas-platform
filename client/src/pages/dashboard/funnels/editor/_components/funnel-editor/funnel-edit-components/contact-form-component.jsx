import { Badge } from "@/components/ui/badge";
import { getFunnel } from "@/lib/actions/funnels/get-funnel";
import ContactForm from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/ContactForm";
import { useEditor } from "@/providers/editor/editor-provider";
import { useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";

const ContactFormComponent = ({ element }) => {
  const { dispatch, state, subAccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();

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

  const styles = element.styles;

  const goToNextPage = async () => {
    if (!state.editor.liveMode) return;
    const funnelsPage = await getFunnel(funnelId);
    if (!funnelsPage || !pageDetails) return;
    if (funnelsPage.FunnelPages.length > pageDetails.order + 1) {
      const nextPage = funnelsPage.FunnelPages.find(
        (page) => page.order === pageDetails.order + 1
      );

      if (!nextPage) return;
      router.navigate({
        to: `${import.meta.env.VITE_SCHEME}${funnelsPage.subDomainName}.${import.meta.env.VITE_PUBLIC_DOMAIN}/${nextPage.pathName}`,
        replace: true,
      });
    }
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      onClick={handleOnClickBody}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,
          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border  border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg bg-black text-white">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <ContactForm
        state={state}
        goToNextPage={goToNextPage}
        subAccountId={subAccountId}
      />

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-black px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
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

export default ContactFormComponent;

ContactFormComponent.propTypes = {
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
