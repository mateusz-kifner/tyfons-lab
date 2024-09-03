"use client";
import { useRef, useState } from "react";
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
import { useEffectOnce } from "@/hooks/useEffectOnce";
import BoundingBox from "../_svg_editor/BoundingBox";
import { DndContext } from "@dnd-kit/core";

interface SVGEditorProps {
  title: string;
}

function SVGEditor(props: SVGEditorProps) {
  const { title } = props;
  const [tool, setTool] = useState<
    "pointer" | "rect" | "circle" | "line" | "polygon" | "point"
  >("pointer");
  const [mode, setMode] = useState<0 | 1 | 2>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffectOnce(() => {
    scrollRef.current?.scrollTo(1080 * 3, 720 * 3);
  });

  return (
    <div className="flex w-full grow flex-col overflow-hidden">
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
      <div className="relative flex w-screen grow overflow-hidden">
        <div
          ref={scrollRef}
          className="absolute top-0 left-0 h-full w-full overflow-scroll"
        >
          <DndContext>
            <div
              style={{
                width: 1080 * 6,
                height: 720 * 6,
              }}
            >
              <div
                className="absolute"
                style={{
                  top: 720 * 3,
                  left: 1080 * 3,
                  width: 1080,
                  height: 720,
                }}
              >
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  id="canvas"
                  // ref={mouseRef}
                  className="border-1 border-stone-900 border-solid bg-white"
                  style={{
                    width: 1080,
                    height: 720,
                  }}
                >
                  <rect x="10" y="10" width="100" height="100" />
                </svg>
                <BoundingBox />
              </div>
            </div>
          </DndContext>
        </div>
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
