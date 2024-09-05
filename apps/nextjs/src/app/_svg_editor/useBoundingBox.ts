import { useState } from "react";
import type { AABBType, Handles, Vector2 } from "./BoundingBoxTypes";
import type {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
} from "@dnd-kit/core";

function computeAABBBasedOnHandle(
  AABB: AABBType,
  handle: Handles,
  delta: Vector2,
): AABBType {
  // biome-ignore lint/style/useConst: This variable is intended to be modified
  let newAABB = { A: { ...AABB.A }, B: { ...AABB.B } };
  switch (handle) {
    case "HandleTop": {
      newAABB.A.y += delta.y;
      if (newAABB.A.y > newAABB.B.y) {
        newAABB.A.y = newAABB.B.y;
      }
      break;
    }
    case "HandleBottom": {
      newAABB.B.y += delta.y;
      if (newAABB.B.y < newAABB.A.y) {
        newAABB.B.y = newAABB.A.y;
      }
      break;
    }
    case "HandleLeft": {
      newAABB.A.x += delta.x;
      if (newAABB.A.x > newAABB.B.x) {
        newAABB.A.x = newAABB.B.x;
      }
      break;
    }
    case "HandleRight": {
      newAABB.B.x += delta.x;
      if (newAABB.B.x < newAABB.A.x) {
        newAABB.B.x = newAABB.A.x;
      }
      break;
    }
    case "HandleTopLeft": {
      newAABB.A.x += delta.x;
      newAABB.A.y += delta.y;
      if (newAABB.A.x > newAABB.B.x) {
        newAABB.A.x = newAABB.B.x;
      }
      if (newAABB.A.y > newAABB.B.y) {
        newAABB.A.y = newAABB.B.y;
      }
      break;
    }
    case "HandleTopRight": {
      newAABB.A.y += delta.y;
      newAABB.B.x += delta.x;
      if (newAABB.B.x < newAABB.A.x) {
        newAABB.B.x = newAABB.A.x;
      }
      if (newAABB.A.y > newAABB.B.y) {
        newAABB.A.y = newAABB.B.y;
      }
      break;
    }
    case "HandleBottomLeft": {
      newAABB.A.x += delta.x;
      newAABB.B.y += delta.y;
      if (newAABB.A.x > newAABB.B.x) {
        newAABB.A.x = newAABB.B.x;
      }
      if (newAABB.B.y < newAABB.A.y) {
        newAABB.B.y = newAABB.A.y;
      }
      break;
    }
    case "HandleBottomRight": {
      newAABB.B.x += delta.x;
      newAABB.B.y += delta.y;
      if (newAABB.B.x < newAABB.A.x) {
        newAABB.B.x = newAABB.A.x;
      }
      if (newAABB.B.y < newAABB.A.y) {
        newAABB.B.y = newAABB.A.y;
      }
      break;
    }
    case "HandleActiveArea": {
      newAABB.A.x += delta.x;
      newAABB.A.y += delta.y;
      newAABB.B.x += delta.x;
      newAABB.B.y += delta.y;
      break;
    }
    default:
      throw new Error("[BoundingBox]: unknown drag handle");
  }

  return newAABB;
}

interface useBoundingBoxProps {
  onAABBset?: (newAABB: AABBType) => void;
  onAABBmove?: (newAABB: AABBType) => void;
}

function useBoundingBox({ onAABBset, onAABBmove }: useBoundingBoxProps) {
  const [AABBbox, setAABBbox] = useState<AABBType>({
    A: { x: 0, y: 0 },
    B: { x: 0, y: 0 },
  });

  const [activeHandle, setActiveHandle] = useState<
    Handles | "HandleActiveArea" | null
  >(null);
  const [AABB, setAABB] = useState(AABBbox);

  function onDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    setActiveHandle(null);
    const newAABB = computeAABBBasedOnHandle(AABB, active.id as Handles, delta);
    setAABBbox(newAABB);
    setAABB(newAABB);
    onAABBset?.(newAABB);
  }

  function onDragMove(event: DragMoveEvent) {
    const { active, delta } = event;
    const newAABB = computeAABBBasedOnHandle(AABB, active.id as Handles, delta);
    setAABBbox(newAABB);
    onAABBmove?.(newAABB);
  }

  function onDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveHandle(active.id as Handles);
  }

  return {
    eventHandlers: {
      onDragEnd,
      onDragMove,
      onDragStart,
    },
    activeHandle,
    AABBbox,
    setAABBbox,
    AABB,
    setAABB,
  };
}

export default useBoundingBox;
