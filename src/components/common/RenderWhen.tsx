import { PropsWithChildren } from "react";

interface IRenderWhenProps {
  condition: boolean;
}

const RenderWhen = ({
  condition,
  children,
}: PropsWithChildren<IRenderWhenProps>) => {
  return <>{condition && children}</>;
};

export default RenderWhen;
