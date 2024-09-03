"use client";
import type { ComponentProps } from "react";
import BoundingBoxButton, { Axis } from "./BoundingBoxButton";
import {
  IconArrowsHorizontal,
  IconArrowsVertical,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { DndContext } from "@dnd-kit/core";
import BoundingBoxActiveArea from "./BoundingBoxActiveArea";
import { cn } from "@tyfons-lab/ui-web";
import type { AABBType, Handles, Vector2 } from "./BoundingBoxTypes";
import { IconArrowRotate } from "./IconArrowRotate.svg";

const buttonSize = 28;
const buttonOffset = 5;

interface BoundingBoxProps extends ComponentProps<typeof DndContext> {
  AABBbox: AABBType;
  AABB: AABBType;
  activeHandle?: Handles | null;
  className?: string;
  mode?: 0 | 1;
  onBoundingBoxClick?: () => void;
}

function BoundingBox(props: BoundingBoxProps) {
  const {
    className,
    onDragMove,
    onDragStart,
    onDragEnd,
    AABBbox,
    AABB,
    activeHandle,
    mode = 0,
    onBoundingBoxClick,
  } = props;

  const size: Vector2 = {
    x: AABBbox.B.x - AABBbox.A.x,
    y: AABBbox.B.y - AABBbox.A.y,
  };

  return (
    <div
      className={cn("relative h-0 w-0", className)}
      onMouseDown={onBoundingBoxClick}
    >
      <DndContext
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
        onDragStart={onDragStart}
      >
        <BoundingBoxActiveArea
          className="absolute border border-stone-900 border-dashed"
          AABB={AABBbox}
          id="HandleActiveArea"
        />
        {mode === 0 ? (
          <>
            <BoundingBoxButton
              position={{
                x: AABBbox.B.x - size.x / 2 - buttonSize / 2,
                y: AABBbox.B.y,
              }}
              axis={Axis.Vertical}
              active={activeHandle === "HandleBottom"}
              id="HandleBottom"
            >
              <IconArrowsVertical
                color="#fff"
                className="mix-blend-difference"
              />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.A.x + size.x / 2 - buttonSize / 2,
                y: AABBbox.A.y - buttonSize,
              }}
              axis={Axis.Vertical}
              active={activeHandle === "HandleTop"}
              id="HandleTop"
            >
              <IconArrowsVertical
                color="#fff"
                className="mix-blend-difference"
              />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.A.x - buttonSize,
                y: AABBbox.A.y + size.y / 2 - buttonSize / 2,
              }}
              axis={Axis.Horizontal}
              active={activeHandle === "HandleLeft"}
              id="HandleLeft"
            >
              <IconArrowsHorizontal
                color="#fff"
                className="mix-blend-difference"
              />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.B.x,
                y: AABBbox.B.y - size.y / 2 - buttonSize / 2,
              }}
              axis={Axis.Horizontal}
              active={activeHandle === "HandleRight"}
              id="HandleRight"
            >
              <IconArrowsHorizontal
                color="#fff"
                className="mix-blend-difference"
              />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.A.x - buttonSize + buttonOffset,
                y: AABBbox.A.y - buttonSize + buttonOffset,
              }}
              active={activeHandle === "HandleTopLeft"}
              id="HandleTopLeft"
            >
              <IconArrowsHorizontal
                color="#fff"
                className="rotate-45 mix-blend-difference"
              />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.B.x - buttonOffset,
                y: AABBbox.A.y - buttonSize + buttonOffset,
              }}
              active={activeHandle === "HandleTopRight"}
              id="HandleTopRight"
            >
              <IconArrowsVertical
                color="#fff"
                className="rotate-45 mix-blend-difference"
              />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.A.x - buttonSize + buttonOffset,
                y: AABBbox.B.y - buttonOffset,
              }}
              active={activeHandle === "HandleBottomLeft"}
              id="HandleBottomLeft"
            >
              <IconArrowsHorizontal
                color="#fff"
                className="-rotate-45 mix-blend-difference"
              />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.B.x - buttonOffset,
                y: AABBbox.B.y - buttonOffset,
              }}
              active={activeHandle === "HandleBottomRight"}
              id="HandleBottomRight"
            >
              <IconArrowsVertical
                className="-rotate-45 mix-blend-difference"
                color="#fff"
              />
            </BoundingBoxButton>
          </>
        ) : (
          <>
            <BoundingBoxButton
              position={{
                x: AABBbox.A.x - buttonSize + buttonOffset,
                y: AABBbox.A.y - buttonSize + buttonOffset,
              }}
              active={activeHandle === "HandleTopLeft"}
              id="HandleTopLeft"
            >
              <IconArrowRotate className="rotate-180 mix-blend-difference" />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.B.x - buttonOffset,
                y: AABBbox.A.y - buttonSize + buttonOffset,
              }}
              active={activeHandle === "HandleTopRight"}
              id="HandleTopRight"
            >
              <IconArrowRotate className="-rotate-90 mix-blend-difference" />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.A.x - buttonSize + buttonOffset,
                y: AABBbox.B.y - buttonOffset,
              }}
              active={activeHandle === "HandleBottomLeft"}
              id="HandleBottomLeft"
            >
              <IconArrowRotate className="rotate-90 mix-blend-difference" />
            </BoundingBoxButton>
            <BoundingBoxButton
              position={{
                x: AABBbox.B.x - buttonOffset,
                y: AABBbox.B.y - buttonOffset,
              }}
              active={activeHandle === "HandleBottomRight"}
              id="HandleBottomRight"
            >
              <IconArrowRotate className="mix-blend-difference" />
            </BoundingBoxButton>
          </>
        )}
      </DndContext>
    </div>
  );
}

export default BoundingBox;
