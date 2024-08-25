import { useState } from "react";
import SVGEditorToolbarButton from "../_svg_editor/Button";

interface SVGEditorProps {
  title: string;
}

function SVGEditor(props: SVGEditorProps) {
  const { title } = props;
  const [tool, setTool] = useState<"pointer" | "rect" | "circle" | "line">(
    "pointer",
  );

  return (
    <div>
      <div id="Toolbar">
        <SVGEditorToolbarButton>Test</SVGEditorToolbarButton>
      </div>
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg id="canvas">
        <rect x="10" y="10" width="100" height="100" />
      </svg>
    </div>
  );
}

export default SVGEditor;
