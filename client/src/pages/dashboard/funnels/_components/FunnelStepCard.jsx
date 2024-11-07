import { useSortable } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, Mail } from "lucide-react";
import { createPortal } from "react-dom";

const FunnelStepCard = ({ activePage, funnelPage }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: funnelPage?.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: CSS.Transition.toString(transition),
  };

  const component = (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-0 relative select-none touch-none ${
        isDragging ? "z-50 opacity-50" : "opacity-100"
      } ${activePage ? "ring-2 ring-primary" : ""}`}
      {...attributes}
      {...listeners}
    >
      <CardContent className="flex flex-row items-center gap-4 p-0">
        <div className="flex items-center justify-center size-14 bg-muted">
          <Mail />
          <ArrowDown size={18} className="absolute -bottom-2 text-primary" />
        </div>
        <span className="font-medium">{funnelPage?.name}</span>
      </CardContent>
      {activePage && (
        <div className="absolute rounded-full size-2 top-2 right-2 bg-emerald-500" />
      )}
    </Card>
  );

  if (isDragging) {
    return createPortal(component, document.body);
  }

  return component;
};

export default FunnelStepCard;

FunnelStepCard.propTypes = {
  funnelPage: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  activePage: PropTypes.bool,
};
