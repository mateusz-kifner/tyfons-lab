"use client";
import { useState } from "react";
import SVGEditorToolbarButton from "../_svg_editor/Button";
import {
  IconCircle,
  IconLine,
  IconPoint,
  IconPointer,
  IconPolygon,
  IconRectangle,
} from "@tabler/icons-react";
import { useMouse } from "@mantine/hooks";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@tyfons-lab/ui-web/menubar";

interface SVGEditorProps {
  title: string;
}

function SVGEditor(props: SVGEditorProps) {
  const { title } = props;
  const [tool, setTool] = useState<
    "pointer" | "rect" | "circle" | "line" | "polygon" | "point"
  >("pointer");
  const [mode, setMode] = useState<0 | 1 | 2>(0);
  const { ref: mouseRef, x, y } = useMouse();

  return (
    <div className="flex h-full w-full grow flex-col">
      <div className="flex p-1">
        <Menubar className="flex grow">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New file <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Open</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Save</MenubarItem>
              <MenubarItem>Save as...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="relative flex h-full w-full grow">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          id="canvas"
          ref={mouseRef}
          className="absolute top-0 left-0 border-1 border-stone-900 border-solid bg-white"
          style={{
            width: 1080,
            height: 720,
          }}
        >
          <rect x="10" y="10" width="100" height="100" />
        </svg>
        <div
          className="absolute top-0 left-0 h-2 w-2 rounded-full bg-red-500"
          style={{
            transform: `translate(${x - 4}px, ${y - 4}px)`,
          }}
        />
        <div
          id="Toolbar"
          className="-translate-y-1/2 absolute top-1/2 left-2 flex flex-col gap-2"
        >
          <SVGEditorToolbarButton
            active={tool === "pointer"}
            onKeyDown={() => {
              setTool("pointer");
              setMode(0);
            }}
          >
            <IconPointer size={32} />
          </SVGEditorToolbarButton>
          <SVGEditorToolbarButton
            active={tool === "rect"}
            onKeyDown={() => {
              setTool("rect");
              setMode(0);
            }}
          >
            <IconRectangle size={32} />
          </SVGEditorToolbarButton>
          <SVGEditorToolbarButton
            active={tool === "circle"}
            onKeyDown={() => {
              setTool("circle");
              setMode(0);
            }}
          >
            <IconCircle size={32} />
          </SVGEditorToolbarButton>
          <SVGEditorToolbarButton
            onKeyDown={() => {
              setTool("polygon");
              setMode(0);
            }}
          >
            <IconPolygon size={32} />
          </SVGEditorToolbarButton>
          <SVGEditorToolbarButton
            active={tool === "line"}
            onKeyDown={() => {
              setTool("line");
              setMode(0);
            }}
          >
            <IconLine size={32} />
          </SVGEditorToolbarButton>
          <SVGEditorToolbarButton
            active={tool === "point"}
            onKeyDown={() => {
              setTool("point");
              setMode(0);
            }}
          >
            <IconPoint size={32} />
          </SVGEditorToolbarButton>
        </div>
      </div>
    </div>
  );
}

export default SVGEditor;
