import { cn } from "@tyfons-lab/ui-web";

export const IconArrowRotate = ({ className }: { className: string }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: this is icon
  <svg
    className={cn("icon icon-tabler icon-tabler-arrows-vertical", className)}
    width="32"
    height="32"
    fill="none"
    stroke="#fff"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    version="1.1"
    viewBox="-4 -4 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <polyline transform="translate(5)" points="8 7 12 3 16 7" />
    <polyline transform="rotate(90,9.5,14.5)" points="8 17 12 21 16 17" />
    <path d="m17 3c0 14 0 14-14 14" />
  </svg>
);
