import type { CapitalizeFirstLetter } from "@/types/utils";

export type BoundingBoxHandleHorizontalDirections = "left" | "right";
export type BoundingBoxHandleVerticalDirections = "top" | "bottom";
export type BoundingBoxHandleDiagonalDirections =
  `${BoundingBoxHandleVerticalDirections}${CapitalizeFirstLetter<BoundingBoxHandleHorizontalDirections>}`;
export type Handles =
  | `Handle${CapitalizeFirstLetter<BoundingBoxHandleHorizontalDirections | BoundingBoxHandleVerticalDirections | BoundingBoxHandleDiagonalDirections>}`
  | "HandleActiveArea"
  | "HandleRotate";

export type Vector2 = { x: number; y: number };

export type AABBType = { A: Vector2; B: Vector2 };
