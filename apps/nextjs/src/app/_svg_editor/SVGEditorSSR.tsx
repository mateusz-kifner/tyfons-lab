"use client";
import { useEffect, useRef, useState } from "react";
import SVGEditorToolbarButton from "./Button";
import {
  IconCircle,
  IconLine,
  IconPoint,
  IconPointer,
  IconPolygon,
  IconRectangle,
} from "@tabler/icons-react";
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
import BoundingBox from "./BoundingBox";
import { useEventListener } from "@mantine/hooks";
import useBoundingBox from "./useBoundingBox";
import type { AABBType } from "./BoundingBoxTypes";

interface SVGEditorProps {
  title: string;
}

function SVGEditorSSR(props: SVGEditorProps) {
  const { title } = props;
  const { AABB, AABBbox, setAABBbox, setAABB, activeHandle, eventHandlers } =
    useBoundingBox();
  const [tool, setTool] = useState<
    "pointer" | "rect" | "circle" | "line" | "polygon" | "point"
  >("pointer");
  const [mode, setMode] = useState<0 | 1 | 2>(0);
  const svgRef = useEventListener(
    "click",
    (e) => {
      const target = e.target as SVGSVGElement;
      console.log(target);
      if (!target || target.tagName === "svg") {
        return;
      }
      const x =
        typeof target.getAttribute("x") === "string"
          ? +(target.getAttribute("x") ?? "0")
          : 0;
      const y =
        typeof target.getAttribute("y") === "string"
          ? +(target.getAttribute("y") ?? "0")
          : 0;
      const width =
        typeof target.getAttribute("width") === "string"
          ? +(target.getAttribute("width") ?? "0")
          : 0;
      const height =
        typeof target.getAttribute("height") === "string"
          ? +(target.getAttribute("height") ?? "0")
          : 0;
      const newAABB: AABBType = {
        A: { x, y },
        B: {
          x: x + width,
          y: y + height,
        },
      };
      setAABBbox(newAABB);
      setAABB(newAABB);
      console.log(x, y, width, height);
    },
    // { once: true },
  );
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
                id="svg_file"
                ref={svgRef}
                className="cursor-grabbing border-1 border-stone-900 border-solid bg-white"
                style={{
                  width: 1080,
                  height: 720,
                }}
              >
                <rect x="10" y="10" width="100" height="100" />
              </svg>
              <BoundingBox
                AABBbox={AABBbox}
                AABB={AABB}
                {...eventHandlers}
                activeHandle={activeHandle}
                className="absolute top-0 left-0"
              />
            </div>
          </div>
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

export default SVGEditorSSR;
