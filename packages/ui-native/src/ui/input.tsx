import * as React from "react";
import { TextInput } from "react-native";

import { cn } from "@/utils";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        "h-10 rounded-md border border-input bg-background px-3 text-base text-foreground web:flex native:h-12 web:w-full file:border-0 file:bg-transparent web:py-2 file:font-medium lg:text-sm native:text-lg placeholder:text-muted-foreground native:leading-[1.25] web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:ring-offset-background",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
