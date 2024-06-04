import type { ComponentProps, ReactNode } from "react";
import { cn } from ".";

interface GradientBorderContainerProps extends ComponentProps<"div"> {
  children: ReactNode;
  shadowWidth?: number | string;
  borderWidth?: number | string;
  borderRadius?: number | string;
  shadowBlur?: number | string;
  gradient?: string;
}

const GradientBorderContainer = (props: GradientBorderContainerProps) => {
  const {
    children,
    className,
    shadowWidth = "0.5rem",
    borderWidth = "0.125rem",
    borderRadius = "1rem",
    shadowBlur = "10px",
    gradient = "conic-gradient(rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100% )",
    ...moreProps
  } = props;

  return (
    <div {...moreProps} className={cn("relative", className)}>
      {shadowWidth !== 0 && shadowWidth !== "0px" && (
        <div
          className="-z-10 absolute"
          style={{
            background: gradient,
            left: `-${shadowWidth}`,
            right: `-${shadowWidth}`,
            top: `-${shadowWidth}`,
            bottom: `-${shadowWidth}`,
            borderRadius: `calc(${shadowWidth}/2)`,
            filter: `blur(${shadowBlur})`,
          }}
        />
      )}
      <div
        className="-z-10 absolute"
        style={{
          background: gradient,
          left: `-${borderWidth}`,
          right: `-${borderWidth}`,
          top: `-${borderWidth}`,
          bottom: `-${borderWidth}`,
          borderRadius: `calc(${borderRadius}/2)`,
        }}
      />
      {children}
    </div>
  );
};

export default GradientBorderContainer;
