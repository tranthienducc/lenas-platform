import { Contact2 } from "lucide-react";

const ContactFormPlaceholder = () => {
  const handleDragStart = (e, type) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      className="flex items-center justify-center rounded-lg cursor-pointer h-14 w-14 bg-muted"
    >
      <Contact2 size={40} className="text-muted-foreground" />
    </div>
  );
};

export default ContactFormPlaceholder;
