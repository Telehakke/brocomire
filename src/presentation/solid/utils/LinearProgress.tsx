import { Progress as ArkProgress } from "@ark-ui/solid/progress";
import type { JSX } from "solid-js/jsx-runtime";
import { joinObjectValues } from "./joinObjectValues";

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
    children: JSX.Element;
  }>,
): JSX.Element => {
  return (
    <ArkProgress.Root
      class={props.className}
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
    _: "h-2 overflow-hidden rounded-full",
    bg: "bg-neutral-300",
  };

  return (
    <ArkProgress.Track class={joinObjectValues(className)}>
      <Range />
    </ArkProgress.Track>
  );
};

const Range = (): JSX.Element => {
  const className = {
    _: "h-2 transition-[width] ease-linear",
    bg: "bg-neutral-500",
  };

  return <ArkProgress.Range class={joinObjectValues(className)} />;
};
