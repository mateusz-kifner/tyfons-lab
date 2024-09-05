import { IconRotateClockwise } from "@tabler/icons-react";
import BoundingBoxButton from "./BoundingBoxButton";
import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { AABBType, Vector2 } from "./BoundingBoxTypes";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { buttonSize } from "./BoundingBoxConfig";

interface RotateHandleProps {
  rotation: number;
  setRotation: (rotation: number) => void;
  className?: string;
  AABBbox: AABBType;
}

function RotateHandle(props: RotateHandleProps) {
  const { rotation, setRotation, className, AABBbox } = props;
  const size: Vector2 = {
    x: AABBbox.B.x - AABBbox.A.x,
    y: AABBbox.B.y - AABBbox.A.y,
  };

  const center: Vector2 = {
    x: AABBbox.A.x + size.x / 2,
    y: AABBbox.A.y + size.y / 2,
  };

  const rectRadius = Math.sqrt(size.x * size.x + size.y * size.y) / 2;

  const [lastPosition, setLastPosition] = useState<Vector2>(AABBbox.A);
  const [position, setPosition] = useState<Vector2>(AABBbox.A);
  const [dragging, setDragging] = useState(false);
  const [debouncedDragging] = useDebouncedValue(dragging, 500);

  function onDragEnd(event: DragEndEvent) {
    const { active, delta, activatorEvent } = event;
    const ctrl = (activatorEvent as PointerEvent)?.ctrlKey;

    const newPosition = {
      x: lastPosition.x + delta.x,
      y: lastPosition.y + delta.y,
    };
    let newRotation = Math.atan2(
      newPosition.y - center.y,
      newPosition.x - center.x,
    );
    if (ctrl) {
      // restrict to 5 deg increments
      newRotation += Math.PI; // from (-180deg, 180deg) to (0deg, 360deg)
      newRotation = (newRotation * 180) / Math.PI; // from radians to degrees
      newRotation = Math.round(newRotation / 5) * 5; // round to nearest multiple of 5
      newRotation = (newRotation * Math.PI) / 180; // from degrees to radians
      newRotation -= Math.PI;
    }
    setRotation(newRotation);

    setPosition({
      x:
        center.x -
        buttonSize / 2 +
        Math.cos(rotation) * (rectRadius + buttonSize * 1.5),
      y:
        center.y -
        buttonSize / 2 +
        Math.sin(rotation) * (rectRadius + buttonSize * 1.5),
    });
    setDragging(false);
  }

  function onDragMove(event: DragMoveEvent) {
    const { active, delta, activatorEvent } = event;
    const newPosition = {
      x: lastPosition.x + delta.x,
      y: lastPosition.y + delta.y,
    };
    const ctrl = (activatorEvent as PointerEvent)?.ctrlKey;
    setPosition(newPosition);
    let newRotation = Math.atan2(
      newPosition.y - center.y,
      newPosition.x - center.x,
    );
    if (ctrl) {
      // restrict to 5 deg increments
      newRotation += Math.PI; // from (-180deg, 180deg) to (0deg, 360deg)
      newRotation = (newRotation * 180) / Math.PI; // from radians to degrees
      newRotation = Math.round(newRotation / 5) * 5; // round to nearest multiple of 5
      newRotation = (newRotation * Math.PI) / 180; // from degrees to radians
      newRotation -= Math.PI;
    }
    setRotation(newRotation);
  }

  function onDragStart(event: DragStartEvent) {
    const { active } = event;
    setLastPosition(position);
    setDragging(true);
  }

  function onDragCancel() {
    setDragging(false);
  }

  return (
    <div className={className}>
      {(dragging || debouncedDragging) && (
        <div
          className="h-12 w-12 text-center "
          style={{
            transform: `translate(${AABBbox.A.x + size.x / 2 - 24}px, ${AABBbox.A.y + size.y / 2 - 12}px)`,
          }}
        >
          {((rotation * 180) / Math.PI).toFixed(1)}
        </div>
      )}
      <DndContext
        onDragEnd={onDragEnd}
        onDragMove={onDragMove}
        onDragStart={onDragStart}
        onDragCancel={onDragCancel}
      >
        <BoundingBoxButton
          position={{
            x: position.x,
            y: position.y,
          }}
          id="HandleRotate"
        >
          <IconRotateClockwise
            size={18}
            className="rotate-180 mix-blend-difference"
          />
        </BoundingBoxButton>
      </DndContext>
    </div>
  );
}

export default RotateHandle;
