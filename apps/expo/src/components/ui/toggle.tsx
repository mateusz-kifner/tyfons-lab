import { cva, type VariantProps } from "class-variance-authority";
import type { TablerIcon } from "@/components/Icons";
import * as React from "react";
import { TextClassContext } from "@/components/ui/text";
import * as TogglePrimitive from "@/components/primitives/toggle";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "web:group items-center justify-center rounded-md web:inline-flex active:bg-muted web:hover:bg-muted web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:ring-offset-background web:transition-colors",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent active:bg-accent active:bg-accent web:hover:bg-accent",
      },
      size: {
        default: "h-10 px-3 native:h-12 native:px-[12]",
        sm: "h-9 px-2.5 native:h-10 native:px-[9]",
        lg: "h-11 px-5 native:h-14 native:px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const toggleTextVariants = cva(
  "font-medium text-foreground text-sm native:text-base",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "web:group-active:text-accent-foreground web:group-hover:text-accent-foreground",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TextClassContext.Provider
    value={cn(
      toggleTextVariants({ variant, size }),
      props.pressed
        ? "text-accent-foreground"
        : "web:group-hover:text-muted-foreground",
      className,
    )}
  >
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        props.disabled && "opacity-50 web:pointer-events-none",
        props.pressed && "bg-accent",
        className,
      )}
      {...props}
    />
  </TextClassContext.Provider>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

function ToggleIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<TablerIcon> & {
  icon: TablerIcon;
}) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants };
