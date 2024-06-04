import { IconCheck } from "@tabler/icons-react";
import GradientBorderContainer from "@tyfons-lab/ui-web/gradient-border-container";
import RadialGradientContainer from "@tyfons-lab/ui-web/radial-gradient-container";

function TestPage() {
  return (
    <div>
      <GradientBorderContainer className="m-10 flex h-20 w-20 items-center justify-center bg-stone-800 rounded-md">
        Test
        <div className="h-10 w-10">
          <IconCheck />
        </div>
      </GradientBorderContainer>
    </div>
  );
}

export default TestPage;
