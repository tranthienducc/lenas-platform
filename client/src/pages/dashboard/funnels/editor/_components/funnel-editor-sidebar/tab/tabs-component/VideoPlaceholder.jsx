import { VideoIcon } from "lucide-react";

const VideoPlaceholder = () => {
  const handleDragStart = (e, type) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      className="flex items-center justify-center rounded-lg cursor-pointer h-14 w-14 bg-muted"
    >
      <VideoIcon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default VideoPlaceholder;
