import SVGEditorToolbarButton from "./Button";
import {
  IconCircle,
  IconLine,
  IconPoint,
  IconPointer,
  IconPolygon,
  IconRectangle,
} from "@tabler/icons-react";

export type ToolNamesType =
  | "pointer"
  | "rect"
  | "circle"
  | "polygon"
  | "line"
  | "point"
  | "path";

interface SVGEditorToolbarProps {
  tool: ToolNamesType;
  setTool: (tool: ToolNamesType) => void;
}

function SVGEditorToolbar({ tool, setTool }: SVGEditorToolbarProps) {
  return (
    <div
      id="Toolbar"
      className="-translate-y-1/2 absolute top-1/2 left-2 flex flex-col gap-2"
    >
      <SVGEditorToolbarButton
        active={tool === "pointer"}
        onKeyDown={() => setTool("pointer")}
      >
        <IconPointer size={32} />
      </SVGEditorToolbarButton>
      <SVGEditorToolbarButton
        active={tool === "rect"}
        onKeyDown={() => setTool("rect")}
      >
        <IconRectangle size={32} />
      </SVGEditorToolbarButton>
      <SVGEditorToolbarButton
        active={tool === "circle"}
        onKeyDown={() => setTool("circle")}
      >
        <IconCircle size={32} />
      </SVGEditorToolbarButton>
      <SVGEditorToolbarButton onKeyDown={() => setTool("polygon")}>
        <IconPolygon size={32} />
      </SVGEditorToolbarButton>
      <SVGEditorToolbarButton
        active={tool === "line"}
        onKeyDown={() => setTool("line")}
      >
        <IconLine size={32} />
      </SVGEditorToolbarButton>
      <SVGEditorToolbarButton
        active={tool === "point"}
        onKeyDown={() => setTool("point")}
      >
        <IconPoint size={32} />
      </SVGEditorToolbarButton>
    </div>
  );
}
export default SVGEditorToolbar;
