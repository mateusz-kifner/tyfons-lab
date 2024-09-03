"use client";
import { useState } from "react";
import BoundingBoxButton, { Axis } from "./BoundingBoxButton";
import {
  IconArrowBigDown,
  IconArrowsHorizontal,
  IconArrowsVertical,
  IconArrowBigUp,
} from "@tabler/icons-react";
import {
  DndContext,
  type DragMoveEvent,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

const buttonSize = 28;
const buttonOffset = 5;

type CapitalizeFirstLetter<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S;

type HorizontalDirections = "left" | "right";
type VerticalDirections = "top" | "bottom";
type DiagonalDirections =
  `${VerticalDirections}${CapitalizeFirstLetter<HorizontalDirections>}`;
type Handles =
  `Handle${CapitalizeFirstLetter<HorizontalDirections | VerticalDirections | DiagonalDirections>}`;

type Vector2 = { x: number; y: number };

type AABB = { A: Vector2; B: Vector2 };

interface BoundingBoxProps {
  onChangeAABB?: (pos: Vector2) => void;
  initialAABB?: AABB;
}

function BoundingBox(props: BoundingBoxProps) {
  const {
    onChangeAABB,
    initialAABB = { A: { x: 0, y: 0 }, B: { x: 100, y: 100 } },
  } = props;
  const [activeHandle, setActiveHandle] = useState<Handles | null>(null);
  const [AABB, setAABB] = useState(initialAABB);
  const [AABBbox, setAABBbox] = useState(initialAABB);

  function onDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    setActiveHandle(null);
    switch (active.id) {
      case "HandleTop": {
        setAABBbox({
          ...AABB,
          A: { x: AABB.A.x, y: AABB.A.y + delta.y },
        });
        setAABB((prev) => ({
          ...prev,
          A: { x: prev.A.x, y: prev.A.y + delta.y },
        }));
        return;
      }
      case "HandleBottom": {
        setAABBbox({
          ...AABB,
          B: { x: AABB.B.x, y: AABB.B.y + delta.y },
        });
        setAABB((prev) => ({
          ...prev,
          B: { x: prev.B.x, y: prev.B.y + delta.y },
        }));

        return;
      }
      case "HandleLeft": {
        setAABBbox({
          ...AABB,
          A: { x: AABB.A.x + delta.x, y: AABB.A.y },
        });
        setAABB((prev) => ({
          ...prev,
          A: { x: prev.A.x + delta.x, y: prev.A.y },
        }));

        return;
      }
      case "HandleRight": {
        setAABBbox({
          ...AABB,
          B: { x: AABB.B.x + delta.x, y: AABB.B.y },
        });
        setAABB((prev) => ({
          ...prev,
          B: { x: prev.B.x + delta.x, y: prev.B.y },
        }));

        return;
      }
      case "HandleTopLeft": {
        setAABBbox((prev) => ({
          ...prev,
          A: { x: AABB.A.x + delta.x, y: AABB.A.y + delta.y },
        }));
        setAABB((prev) => ({
          ...prev,
          A: { x: prev.A.x + delta.x, y: prev.A.y + delta.y },
        }));
        return;
      }
      case "HandleTopRight": {
        setAABBbox((prev) => ({
          A: { x: prev.A.x, y: AABB.A.y + delta.y },
          B: { x: AABB.B.x + delta.x, y: prev.B.y },
        }));
        setAABB((prev) => ({
          A: { x: prev.A.x, y: prev.A.y + delta.y },
          B: { x: prev.B.x + delta.x, y: prev.B.y },
        }));
        return;
      }
      case "HandleBottomLeft": {
        setAABBbox((prev) => ({
          A: { x: AABB.A.x + delta.x, y: prev.A.y },
          B: { x: prev.B.x, y: AABB.B.y + delta.y },
        }));
        setAABB((prev) => ({
          A: { x: prev.A.x + delta.x, y: prev.A.y },
          B: { x: prev.B.x, y: prev.B.y + delta.y },
        }));
        return;
      }
      case "HandleBottomRight": {
        setAABBbox((prev) => ({
          ...prev,
          B: { x: AABB.B.x + delta.x, y: AABB.B.y + delta.y },
        }));
        setAABB((prev) => ({
          ...prev,
          B: { x: prev.B.x + delta.x, y: prev.B.y + delta.y },
        }));
        return;
      }
      default:
        throw new Error("[BoundingBox]: unknown drag element");
    }
  }

  function onDragMove(event: DragMoveEvent) {
    const { active, delta } = event;
    switch (active.id) {
      case "HandleTop": {
        setAABBbox((prev) => ({
          ...prev,
          A: { x: prev.A.x, y: AABB.A.y + delta.y },
        }));
        return;
      }
      case "HandleBottom": {
        setAABBbox((prev) => ({
          ...prev,
          B: { x: prev.B.x, y: AABB.B.y + delta.y },
        }));
        return;
      }
      case "HandleLeft": {
        setAABBbox((prev) => ({
          ...prev,
          A: { x: AABB.A.x + delta.x, y: prev.A.y },
        }));
        return;
      }
      case "HandleRight": {
        setAABBbox((prev) => ({
          ...prev,
          B: { x: AABB.B.x + delta.x, y: prev.B.y },
        }));
        return;
      }
      case "HandleTopLeft": {
        setAABBbox((prev) => ({
          ...prev,
          A: { x: AABB.A.x + delta.x, y: AABB.A.y + delta.y },
        }));
        return;
      }
      case "HandleTopRight": {
        setAABBbox((prev) => ({
          A: { x: prev.A.x, y: AABB.A.y + delta.y },
          B: { x: AABB.B.x + delta.x, y: prev.B.y },
        }));
        return;
      }
      case "HandleBottomLeft": {
        setAABBbox((prev) => ({
          A: { x: AABB.A.x + delta.x, y: prev.A.y },
          B: { x: prev.B.x, y: AABB.B.y + delta.y },
        }));
        return;
      }
      case "HandleBottomRight": {
        setAABBbox((prev) => ({
          ...prev,
          B: { x: AABB.B.x + delta.x, y: AABB.B.y + delta.y },
        }));
        return;
      }
      default:
        throw new Error("[BoundingBox]: unknown drag element");
    }
  }

  function onDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveHandle(active.id as Handles);
  }

  const size: Vector2 = {
    x: AABBbox.B.x - AABBbox.A.x,
    y: AABBbox.B.y - AABBbox.A.y,
  };

  return (
    <div className="relative inset-0">
      <div
        className="absolute border border-stone-900 border-solid"
        style={{
          top: AABBbox.A.y,
          left: AABBbox.A.x,
          width: AABBbox.B.x - AABBbox.A.x,
          height: AABBbox.B.y - AABBbox.A.y,
        }}
      />
      <DndContext
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
        onDragStart={onDragStart}
      >
        <BoundingBoxButton
          position={{
            x: AABBbox.B.x - size.x / 2 - buttonSize / 2,
            y: AABBbox.B.y,
          }}
          axis={Axis.Vertical}
          active={activeHandle === "HandleBottom"}
          id="HandleBottom"
        >
          <IconArrowsVertical color="#fff" className="mix-blend-difference" />
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
          <IconArrowsVertical color="#fff" className="mix-blend-difference" />
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
          <IconArrowsHorizontal color="#fff" className="mix-blend-difference" />
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
          <IconArrowsHorizontal color="#fff" className="mix-blend-difference" />
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
      </DndContext>
    </div>
  );
}

export default BoundingBox;
