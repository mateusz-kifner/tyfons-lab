import { cva, type VariantProps } from "class-variance-authority";
import type { TablerIcon } from "@/components/Icons";
import * as React from "react";
import { TextClassContext } from "@/components/ui/text";
import * as TogglePrimitive from "@/components/primitives/toggle";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "web:group web:inline-flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:hover:bg-muted web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:bg-muted",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent web:hover:bg-accent active:bg-accent active:bg-accent",
      },
      size: {
        default: "h-10 native:h-12 native:px-[12] px-3",
        sm: "h-9 native:h-10 native:px-[9] px-2.5",
        lg: "h-11 native:h-14 native:px-6 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const toggleTextVariants = cva(
  "font-medium native:text-base text-foreground text-sm",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "web:group-hover:text-accent-foreground web:group-active:text-accent-foreground",
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
        props.disabled && "web:pointer-events-none opacity-50",
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
