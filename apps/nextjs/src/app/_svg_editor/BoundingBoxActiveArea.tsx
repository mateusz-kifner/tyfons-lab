import { useDraggable } from "@dnd-kit/core";
import type { AABBType } from "./BoundingBoxTypes";
import { cn } from "@tyfons-lab/ui-web";
import type { ComponentProps } from "react";

interface BoundingBoxActiveAreaProps extends ComponentProps<"div"> {
  AABB: AABBType;
  active?: boolean;
  id: string;
}

function BoundingBoxActiveArea(props: BoundingBoxActiveAreaProps) {
  const { AABB, active = false, id, className, ...moreProps } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        top: AABB.A.y,
        left: AABB.A.x,
        width: AABB.B.x - AABB.A.x,
        height: AABB.B.y - AABB.A.y,
      }}
      className={cn(
        "absolute p-0",
        active && "bg-accent text-accent-foreground",
        className,
      )}
      {...listeners}
      {...attributes}
      {...moreProps}
    />
  );
}

export default BoundingBoxActiveArea;
