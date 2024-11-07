const TwoColumnsPlaceholder = () => {
  const handleDragStart = (e, type) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "2Col")}
      className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px] cursor-pointer"
    >
      <div className="w-full h-full border border-dashed rounded-sm bg-muted border-muted-foreground/50"></div>
      <div className="w-full h-full border border-dashed rounded-sm bg-muted border-muted-foreground/50"></div>
    </div>
  );
};

export default TwoColumnsPlaceholder;
