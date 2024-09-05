import { Separator } from "@tyfons-lab/ui-web/separator";
import _ from "lodash";
import { Input } from "@tyfons-lab/ui-web/input";
import { useId } from "react";
import { svgAttributesData } from "./svgAttributesData";

const svgTagNames = Object.keys(svgAttributesData);
interface SVGEditorPropertiesProps {
  element: SVGElement | null;
}

function SVGEditorProperties(props: SVGEditorPropertiesProps) {
  const { element } = props;
  const uuid = useId();
  const elemName = element?.tagName;
  if (elemName === undefined || !svgTagNames.includes(elemName)) {
    return null;
  }

  return (
    <>
      <h3> {_.capitalize(elemName ?? "svg")}</h3>
      <Separator />
      {
        !!element &&
          Object.keys(
            svgAttributesData[elemName as keyof typeof svgAttributesData],
          ).map((attrName, index) => (
            <div key={`${uuid}${index}${attrName}`}>
              {attrName}{" "}
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  element?.setAttribute(attrName, value);
                }}
                defaultValue={element?.getAttribute(attrName) ?? 0}
              />
            </div>
          ))
        // element?.attributes.length > 0 &&
        // Array.from(element.attributes).map((attr, index) => (
        //
        // ))
      }
    </>
  );
}

export default SVGEditorProperties;
