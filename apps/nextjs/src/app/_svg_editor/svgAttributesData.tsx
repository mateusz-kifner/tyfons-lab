export const svgAttributesData = {
  rect: {
    x: { default: { value: 0, unit: "px" }, type: "unit" },
    y: { default: { value: 0, unit: "px" }, type: "unit" },
    width: { default: { value: 100, unit: "px" }, type: "unit" },
    height: { default: { value: 100, unit: "px" }, type: "unit" },
    rx: { default: { value: 0, unit: "px" }, type: "unit" },
    ry: { default: { value: 0, unit: "px" }, type: "unit" },
  },
  line: {
    x1: { default: { value: 0, unit: "px" }, type: "unit" },
    y1: { default: { value: 0, unit: "px" }, type: "unit" },
    x2: { default: { value: 100, unit: "px" }, type: "unit" },
    y2: { default: { value: 100, unit: "px" }, type: "unit" },
  },
  circle: {
    cx: { default: { value: 0, unit: "px" }, type: "unit" },
    cy: { default: { value: 0, unit: "px" }, type: "unit" },
    r: { default: { value: 50, unit: "px" }, type: "unit" },
  },
  ellipse: {
    cx: { default: { value: 0, unit: "px" }, type: "unit" },
    cy: { default: { value: 0, unit: "px" }, type: "unit" },
    rx: { default: { value: 50, unit: "px" }, type: "unit" },
    ry: { default: { value: 50, unit: "px" }, type: "unit" },
  },
  polyline: { points: { default: [], type: "points" } },
  polygon: { points: { default: [], type: "points" } },
  path: { d: { default: [], type: "path" } },
  image: {
    x: { default: { value: 0, unit: "px" }, type: "unit" },
    y: { default: { value: 0, unit: "px" }, type: "unit" },
    width: { default: { value: 0, unit: "px" }, type: "unit" },
    height: { default: { value: 0, unit: "px" }, type: "unit" },
    href: { default: "", type: "string" }, // TODO: add test element here
  },
  use: {
    x: { default: { value: 0, unit: "px" }, type: "unit" },
    y: { default: { value: 0, unit: "px" }, type: "unit" },
    width: { default: { value: 0, unit: "px" }, type: "unit" },
    height: { default: { value: 0, unit: "px" }, type: "unit" },
    href: { default: "", type: "string" }, // TODO: add test element here
  },
  text: {
    x: { default: { value: 0, unit: "px" }, type: "unit" },
    y: { default: { value: 0, unit: "px" }, type: "unit" },
    dx: { default: { value: 0, unit: "px" }, type: "unit" },
    dy: { default: { value: 0, unit: "px" }, type: "unit" },
    rotate: { default: null, type: "number" }, // rotation in degrees
    textLength: { default: null, type: "number" }, // ?
    lengthAdjust: { default: null, type: "number" }, // ?
    children: { default: "Text", type: "string" }, // TODO: add tspan here
  },
  g: { transform: { default: null, type: "transform" } },
  a: {
    href: { default: "", type: "string" },
    download: { default: "", type: "string" },
    hreflang: { default: "", type: "string" },
    referrerpolicy: { default: "", type: "string" },
    rel: { default: "", type: "string" },
    target: { default: "", type: "string" },
    type: { default: "", type: "string" },
  },
};
export const svgUniversalAttributes = {
  style: { default: null, type: "unit" },
  class: { default: null, type: "unit" },
};

export const svgAllowedUnits = [
  "px",
  // "em",
  // "ex",
  "pt",
  "pc",
  "cm",
  "mm",
  "in",
  "%",
];
