import * as LabelPrimitive from "@/components/primitives/label";
import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Text>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text>
>(
  (
    { className, onPress, onLongPress, onPressIn, onPressOut, ...props },
    ref,
  ) => (
    <LabelPrimitive.Root
      className="web:cursor-default"
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <LabelPrimitive.Text
        ref={ref}
        className={cn(
          "font-medium text-foreground text-sm leading-none web:peer-disabled:cursor-not-allowed native:text-base web:peer-disabled:opacity-70",
          className,
        )}
        {...props}
      />
    </LabelPrimitive.Root>
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
