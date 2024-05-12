import { IconCheck } from "../Icons";
import * as React from "react";
import * as CheckboxPrimitive from "@/primitives/checkbox";

import { Platform } from "react-native";
import { cn } from "@/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "web:peer h-4 w-4 shrink-0 rounded-sm border border-primary native:h-[20] native:w-[20] disabled:cursor-not-allowed native:rounded disabled:opacity-50 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:ring-offset-background",
        props.checked && "bg-primary",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("h-full w-full items-center justify-center")}
      >
        <IconCheck
          size={12}
          strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
          className="text-primary-foreground"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
