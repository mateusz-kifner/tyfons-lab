import { Button } from "@tyfons-lab/ui-web/button";

interface SVGEditorToolbarButtonProps {
  children: React.ReactNode;
}

function SVGEditorToolbarButton(props: SVGEditorToolbarButtonProps) {
  const { children } = props;
  return <Button variant="ghost">{children}</Button>;
}

export default SVGEditorToolbarButton;
