"use client";
import { IconCheck, IconStarFilled } from "@tabler/icons-react";
import { Button, buttonVariants } from "@tyfons-lab/ui-web/button";
import GradientBorderContainer from "@tyfons-lab/ui-web/gradient-border-container";

function TestPage() {
  return (
    <div className="flex flex-col gap-5 p-10">
      <GradientBorderContainer
        className={buttonVariants({
          variant: "outline",
          size: "icon",
          className: "cursor-pointer border-none hover:bg-transparent",
        })}
        style={{ borderRadius: "calc(var(--radius) - 1px)" }}
        borderWidth="1px"
        gradient="linear-gradient(-25deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100% )"
        onClick={() => {
          console.log("click");
        }}
      >
        <IconCheck />
      </GradientBorderContainer>
      <GradientBorderContainer
        className={buttonVariants({
          variant: "outline",
          size: "icon",
          className: "cursor-pointer rounded-full border-none",
        })}
        borderWidth="1px"
        borderRadius="100%"
        shadowWidth="0.25rem"
        gradient="conic-gradient( #FFFFFFFF 0%, #FFEE00FF 11%, #FFFFFFFF 23%, #FFEE00FF 43%, #FFFFFFFF 57%, #FFEE00FF 72%, #FFFFFFFF 88%)"
        onClick={() => {
          console.log("click");
        }}
      >
        <IconStarFilled className="fill-yellow-500" />
      </GradientBorderContainer>
    </div>
  );
}

export default TestPage;
