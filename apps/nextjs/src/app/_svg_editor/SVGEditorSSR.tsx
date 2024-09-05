"use client";
import { useEffect, useId, useRef, useState } from "react";

import { useEffectOnce } from "@/hooks/useEffectOnce";
import BoundingBox from "./BoundingBox";
import { useEventListener, useForceUpdate } from "@mantine/hooks";
import useBoundingBox from "./useBoundingBox";
import type { AABBType, Vector2 } from "./BoundingBoxTypes";
import RotateHandle from "./RotateHandle";
import SVGEditorMenu from "./SVGEditorMenu";
import SVGEditorToolbar, { type ToolNamesType } from "./SVGEditorToolbar";
import SVGEditorProperties from "./SVGEditorProperties";

const canvasWidth = 1080;
const canvasHeight = 720;
const topMenuWidth = 64 + 32;
const rightMenuWidth = 384;

interface SVGEditorProps {
  title: string;
}

function SVGEditorSSR(props: SVGEditorProps) {
  const { title } = props;
  const uuid = useId();
  const [tool, setTool] = useState<ToolNamesType>("pointer");
  const [rotation, setRotation] = useState(0);
  const activeElementRef = useRef<SVGSVGElement | null>(null);
  const [forceUpdateVar, setForceUpdate] = useState(0);

  const forceUpdate = () => {
    setForceUpdate((v) => v + 1);
  };

  const setAABBAction = (newAABB: AABBType) => {
    if (!activeElementRef.current) {
      return;
    }
    activeElementRef.current.setAttribute("x", String(newAABB.A.x));
    activeElementRef.current.setAttribute("y", String(newAABB.A.y));
    activeElementRef.current.setAttribute(
      "width",
      String(newAABB.B.x - newAABB.A.x),
    );
    activeElementRef.current.setAttribute(
      "height",
      String(newAABB.B.y - newAABB.A.y),
    );
  };
  const { AABB, AABBbox, setAABBbox, setAABB, activeHandle, eventHandlers } =
    useBoundingBox({
      onAABBset: setAABBAction,
      onAABBmove: setAABBAction,
    });
  const svgRef = useEventListener(
    "click",
    (e) => {
      const target = e.target as SVGSVGElement;
      console.log(target);
      if (!target) return;
      if (target.tagName === "svg") {
        activeElementRef.current = null;

        forceUpdate();
        return;
      }
      activeElementRef.current = target;
      setTimeout(() => forceUpdate());

      const box = target.getBoundingClientRect();
      const x = box.x;
      const y = box.y;
      const width = box.width;
      const height = box.height;
      const newAABB: AABBType = {
        A: { x, y },
        B: {
          x: x + width,
          y: y + height,
        },
      };
      setAABBbox(newAABB);
      setAABB(newAABB);
    },
    // { once: true },
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffectOnce(() => {
    const bodyRect = document.body.getBoundingClientRect();
    const bodyWidth = bodyRect.width;
    const bodyHeight = bodyRect.height;
    scrollRef.current?.scrollTo(
      canvasWidth * 2.5 - (bodyWidth - canvasWidth - rightMenuWidth) / 2,
      canvasHeight * 2.5 - (bodyHeight - topMenuWidth - canvasHeight) / 2,
    );
  });
  const size: Vector2 = {
    x: AABBbox.B.x - AABBbox.A.x,
    y: AABBbox.B.y - AABBbox.A.y,
  };

  return (
    <div className="flex w-full grow flex-col overflow-hidden">
      <div className="flex p-1">
        <SVGEditorMenu />
      </div>
      <div className="flex grow">
        <div className="relative flex w-screen grow overflow-hidden">
          <div
            ref={scrollRef}
            className="absolute top-0 left-0 h-full w-full overflow-scroll"
          >
            <div
              style={{
                width: canvasWidth * 6,
                height: canvasHeight * 6,
              }}
            >
              <div
                className="absolute"
                style={{
                  top: canvasHeight * 2.5,
                  left: canvasWidth * 2.5,
                  width: canvasWidth,
                  height: canvasHeight,
                }}
              >
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  id="svg_file"
                  ref={svgRef}
                  className=" border-1 border-stone-900 border-solid bg-white"
                  style={{
                    width: canvasWidth,
                    height: canvasHeight,
                  }}
                >
                  <rect x="10" width="100" height="100" />
                  <rect x="130" y="10" width="100" height="100" />
                  <rect x="250" y="10" width="100" height="100" />
                </svg>
                {activeElementRef.current !== null && (
                  <>
                    <BoundingBox
                      AABBbox={AABBbox}
                      AABB={AABB}
                      {...eventHandlers}
                      activeHandle={activeHandle}
                      className="absolute top-0 left-0"
                    />
                    <RotateHandle
                      className="absolute top-0 left-0"
                      AABBbox={AABBbox}
                      rotation={rotation}
                      setRotation={setRotation}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <SVGEditorToolbar tool={tool} setTool={setTool} />
        </div>
        <div className="flex w-96 pr-1 pb-1">
          <div className="flex grow flex-col gap-2 rounded border p-2">
            <SVGEditorProperties
              element={activeElementRef.current}
              key={forceUpdateVar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SVGEditorSSR;
