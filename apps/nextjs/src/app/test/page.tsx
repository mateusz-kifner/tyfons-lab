import { IconCheck } from "@tabler/icons-react";
import RadialGradientContainer from "@tyfons-lab/ui-web/radial-gradient-container";

function TestPage() {
  return (
    <div>
      <RadialGradientContainer className="m-10 flex h-20 w-20 items-center justify-center">
        Test
        <div className="h-10 w-10">
          <IconCheck />
        </div>
      </RadialGradientContainer>
    </div>
  );
}

export default TestPage;
