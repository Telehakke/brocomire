import { Progress as ArkProgress } from "@ark-ui/react/progress";
import type { JSX, ReactNode } from "react";

type LinearProgressProps = Partial<{
  className: string;
  value: number | null;
  min: number;
  max: number;
  orientation: Orientation;
}>;

type Orientation = "horizontal" | "vertical";

export const LinearProgress = (props: LinearProgressProps): JSX.Element => {
  return (
    <Root {...props}>
      <Track />
    </Root>
  );
};

/* -------------------------------------------------------------------------- */

const Root = (
  props: Partial<{
    className: string;
    value: number | null;
    min: number;
    max: number;
    orientation: Orientation;
    children: ReactNode;
  }>,
): JSX.Element => {
  return (
    <ArkProgress.Root
      className={props.className}
      value={props.value}
      min={props.min}
      max={props.max}
      orientation={props.orientation}
      locale={navigator.language}
    >
      {props.children}
    </ArkProgress.Root>
  );
};

/* -------------------------------------------------------------------------- */

const Track = (): JSX.Element => {
  const className = {
    _: "h-2 overflow-hidden rounded-full opacity-75",
    bg: "bg-neutral-300",
  };

  return (
    <ArkProgress.Track className={Object.values(className).join(" ")}>
      <Range />
    </ArkProgress.Track>
  );
};

const Range = (): JSX.Element => {
  const className = {
    _: "h-2 transition-all ease-linear",
    bg: "bg-neutral-500",
  };

  return <ArkProgress.Range className={Object.values(className).join(" ")} />;
};
