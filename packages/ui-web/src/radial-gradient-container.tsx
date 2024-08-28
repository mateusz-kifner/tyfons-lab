import type { ComponentProps, ReactNode } from "react";
import tinycolor2 from "tinycolor2";

const defaultColors = {
  0: [255, 0, 0, 1],
  10: [255, 154, 0, 1],
  20: [208, 222, 33, 1],
  30: [79, 220, 74, 1],
  40: [63, 218, 216, 1],
  50: [47, 201, 226, 1],
  60: [28, 127, 238, 1],
  70: [95, 21, 242, 1],
  80: [186, 12, 248, 1],
  90: [251, 7, 217, 1],
  100: [255, 0, 0, 1],
};

function interplateColorRGB(
  start: InstanceType<typeof tinycolor2>,
  end: InstanceType<typeof tinycolor2>,
  percent: number,
) {
  return tinycolor2.mix(start, end, percent);
}

interface RadialGradientContainerProps extends ComponentProps<"div"> {
  children: ReactNode;
  strokeWidth?: number | string;
  blur?: number | string;
  mode?: "linear" | "radial";
  colors?: Record<string, string>;
}

const RadialGradientContainer = (props: RadialGradientContainerProps) => {
  const {
    children,
    strokeWidth = "0.5rem",
    blur = "10px",
    mode = "linear",
    colors = defaultColors,
    ...moreProps
  } = props;

  const colorStops = Object.entries(colors).map(
    ([stop, color]) => `${color} ${stop}`,
  );
  const getGrad1 = () => {
    const arr = [];

    for (let i = 100 - 12.5; i <= 100; i++) {
      arr.push(colorStops[i]);
    }

    for (let i = 0; i <= 12.5; i++) {
      arr.push(colorStops[i]);
    }

    return;
  };

  return (
    <div
      {...moreProps}
      style={{
        position: "relative",
      }}
    >
      {/* Corners */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: `blur(${blur})`,
        }}
      >
        <div
          className="bg-red-500"
          style={{
            width: strokeWidth,
            height: strokeWidth,
            position: "absolute",
            top: `-${strokeWidth}`,
            left: `-${strokeWidth}`,
            scale: 2,
            translate: "50% 50%",
          }}
        />
        <div
          style={{
            width: strokeWidth,
            height: strokeWidth,
            position: "absolute",
            top: `-${strokeWidth}`,
            right: `-${strokeWidth}`,
            background: "rgba(255, 154, 0, 1)",
            borderTopRightRadius: "50%",
            scale: 2,
            translate: "-50% 50%",
          }}
        />
        <div
          className="bg-red-500"
          style={{
            width: strokeWidth,
            height: strokeWidth,
            position: "absolute",
            bottom: `-${strokeWidth}`,
            left: `-${strokeWidth}`,
            scale: 2,
            translate: "50% -50%",
          }}
        />
        <div
          className="bg-red-500"
          style={{
            width: strokeWidth,
            height: strokeWidth,
            position: "absolute",
            bottom: `-${strokeWidth}`,
            right: `-${strokeWidth}`,
            scale: 2,
            translate: "-50% -50%",
          }}
        />
        {/* sides */}
        <div
          style={{
            height: strokeWidth,
            position: "absolute",
            top: `-${strokeWidth}`,
            right: 0,
            left: 0,
            background:
              "linear-gradient(90deg, rgba(251, 7, 217, 1) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 154, 0, 1) 100%)",
            scale: "1 2",
            translate: "0% 50%",
          }}
        />
        <div
          className="bg-yellow-500"
          style={{
            width: strokeWidth,
            position: "absolute",
            right: `-${strokeWidth}`,
            top: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(255, 154, 0, 1) 0%, rgba(208, 222, 33, 1) 33%, rgba(79, 220, 74, 1) 66%, rgba(63, 218, 216, 1) 100%)",
            scale: "2 1",
            translate: "-50% 0%",
          }}
        />
        <div
          className="bg-green-500"
          style={{
            height: strokeWidth,
            position: "absolute",
            bottom: `-${strokeWidth}`,
            right: 0,
            left: 0,
            scale: "1 2",
            translate: "0% -50%",
          }}
        />
        <div
          className="bg-yellow-500"
          style={{
            width: strokeWidth,
            position: "absolute",
            left: `-${strokeWidth}`,
            top: 0,
            bottom: 0,
            scale: "2 1",
            translate: "50% 0%",
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient( ${colorStops} )`,
        }}
      />
      <div className="absolute inset-1 bg-stone-800" />
      {children}
    </div>
  );
};

export default RadialGradientContainer;
