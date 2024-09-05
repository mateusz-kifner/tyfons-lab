import { Button, type buttonVariants } from "@tyfons-lab/ui-web/button";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@tyfons-lab/ui-web";

export enum Axis {
  All = 0,
  Vertical = 1,
  Horizontal = 2,
  Rotation = 3,
}

interface BoundingBoxButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  position: { x: number; y: number };
  children: ReactNode;
  active?: boolean;
  id: string;
  axis?: Axis;
}

function BoundingBoxButton(props: BoundingBoxButtonProps) {
  const {
    children,
    position,
    id,
    className,
    axis = Axis.All,
    active = false,
  } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  return (
    <Button
      ref={setNodeRef}
      style={{
        top: position.y,
        left: position.x,
      }}
      variant="ghost"
      size="icon"
      className={cn(
        "absolute h-7 w-7 cursor-grab rounded-full p-0",
        active && "bg-accent text-accent-foreground",
        className,
      )}
      {...listeners}
      {...attributes}
    >
      {children}
    </Button>
  );
}

export default BoundingBoxButton;
