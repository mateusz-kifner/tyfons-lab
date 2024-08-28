import { Button, type buttonVariants } from "@tyfons-lab/ui-web/button";
import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@tyfons-lab/ui-web";

interface SVGEditorToolbarButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  active?: boolean;
}

function SVGEditorToolbarButton(props: SVGEditorToolbarButtonProps) {
  const { children, active } = props;
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("h-16 w-16", active && "bg-secondary/80")}
    >
      {children}
    </Button>
  );
}

export default SVGEditorToolbarButton;
