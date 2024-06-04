import { IconCheck } from "@tabler/icons-react";
import { Button, buttonVariants } from "@tyfons-lab/ui-web/button";
import GradientBorderContainer from "@tyfons-lab/ui-web/gradient-border-container";

function TestPage() {
  return (
    <div className="flex flex-col gap-5 p-10">
      <Button variant="outline">
        Test <IconCheck />
      </Button>
      <GradientBorderContainer
        className={buttonVariants({
          variant: "outline",
          className: "border-none hover:bg-transparent",
        })}
        style={{ borderRadius: "calc(var(--radius) - 1px)" }}
        borderWidth="1px"
        shadowWidth="0px"
      >
        Test
        <IconCheck />
      </GradientBorderContainer>
    </div>
  );
}

export default TestPage;
