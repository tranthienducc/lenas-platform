import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";

const DraggableEditorContainer = ({ children, zoom, setZoom }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);
  const animationFrameRef = useRef(null);
  const { state } = useEditor();

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      setPosition({
        x: newX,
        y: newY,
      });
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden text-black bg-white"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={divRef}
    >
      {state.editor.liveMode ? null : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-inherit bg-[radial-gradient(#8685852e_1px,transparent_1px)] [background-size:16px_16px]"></div>
      )}

      {state.editor.liveMode ? null : (
        <ZoomResize setZoom={setZoom} zoom={zoom} divRef={divRef} />
      )}

      <div
        className={clsx(
          "absolute transition-transform w-inherit will-change-transform",
          state.editor.liveMode ? "" : isDragging && "cursor-grabbing"
        )}
        style={{
          transform: state.editor.liveMode
            ? ""
            : `translate(${position.x}px, ${position.y}px)`,
          cursor: state.editor.liveMode ? "" : isDragging ? "grabbing" : "grab",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DraggableEditorContainer;

DraggableEditorContainer.propTypes = {
  children: PropTypes.node,
  setZoom: PropTypes.func,
  zoom: PropTypes.number,
};

function ZoomResize({ zoom, setZoom, divRef }) {
  const hanleSlideChange = (value) => {
    setZoom(value[0]);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (!e.ctrlKey) return;

      switch (e.key) {
        case "+":
        case "=":
          e.preventDefault();
          setZoom((prev) => Math.min(prev + 10, 200));
          break;
        case "-":
          e.preventDefault();
          setZoom((prev) => Math.max(prev - 10, 0));
          break;
        default:
          break;
      }
    },
    [setZoom]
  );

  const handleWhel = useCallback(
    (e) => {
      if (!divRef.current?.contains(e.target)) return;
      if (!e.ctrlKey) return;

      e.preventDefault();
      switch (true) {
        case e.deltaY < 0:
          setZoom((prev) => Math.min(prev + 10, 200));

          break;
        case e.deltaY > 0:
          setZoom((prev) => Math.max(prev - 10, 0));
          break;
        default:
          break;
      }
    },
    [divRef, setZoom]
  );

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };
  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 0));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWhel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWhel);
    };
  }, [handleKeyDown, handleWhel]);

  return (
    <div className="fixed bottom-12 left-[38rem] z-[100]">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          className="px-4 py-2 text-white bg-black border rounded-md cursor-pointer hover:bg-black/20 border-white/15"
          onClick={handleZoomOut}
        >
          -
        </Button>
        <div className="flex items-center gap-2 px-4 py-2 bg-black border rounded-md border-white/15 w-fit">
          <Slider
            value={[zoom]}
            onValueChange={(value) => hanleSlideChange(value)}
            className="hidden"
            min={0}
            max={200}
            step={0}
          />
          <span className="w-12 text-sm text-white tabular-nums">{zoom}%</span>
        </div>
        <Button
          type="button"
          onClick={handleZoomIn}
          className="px-4 py-2 text-white bg-black border rounded-md cursor-pointer border-white/15 hover:bg-black/20"
        >
          +
        </Button>
      </div>
    </div>
  );
}

ZoomResize.propTypes = {
  zoom: PropTypes.number,
  setZoom: PropTypes.func,
  divRef: PropTypes.object,
};
