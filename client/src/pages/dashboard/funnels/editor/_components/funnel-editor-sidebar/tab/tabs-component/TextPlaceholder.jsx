import { TypeIcon } from "lucide-react";

const TextPlaceholder = () => {
  const handleDragStart = (e, type) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "text")}
      className="flex items-center justify-center rounded-lg cursor-pointer size-14 bg-muted"
    >
      <TypeIcon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default TextPlaceholder;
