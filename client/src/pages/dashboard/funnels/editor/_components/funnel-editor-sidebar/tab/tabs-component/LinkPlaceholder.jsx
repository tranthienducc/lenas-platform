import { Link2Icon } from "lucide-react";

const LinkPlaceholder = () => {
  const handleDragStart = (e, type) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "link")}
      className="flex items-center justify-center rounded-lg cursor-pointer h-14 w-14 bg-muted"
    >
      <Link2Icon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default LinkPlaceholder;
