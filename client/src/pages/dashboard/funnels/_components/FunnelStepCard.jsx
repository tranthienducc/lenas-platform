import { useSortable } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, Mail } from "lucide-react";

const FunnelStepCard = ({ activePage = false, funnelPage = { id: "" } }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: funnelPage.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  const component = (
    <Card
      ref={setNodeRef}
      style={style}
      className="relative p-0 my-2 cursor-grab"
      {...attributes}
      {...listeners}
    >
      <CardContent className="flex flex-row items-center gap-4 p-0">
        <div className="flex items-center justify-center h-14 w-14 bg-muted">
          <Mail />
          <ArrowDown size={18} className="absolute -bottom-2 text-primary" />
        </div>
        {funnelPage.name}
      </CardContent>
      {activePage && (
        <div className="absolute w-2 h-2 rounded-full top-2 right-2 bg-emerald-500" />
      )}
    </Card>
  );

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

FunnelStepCard.defaultProps = {
  funnelPage: { id: "", name: "" },
  activePage: false,
};
