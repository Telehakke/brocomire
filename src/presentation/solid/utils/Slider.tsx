import { Slider as ArkSlider, type SliderValueChangeDetails } from "@ark-ui/solid/slider";
import type { JSX } from "solid-js/jsx-runtime";
import { joinObjectValues } from "./joinObjectValues";

type SliderProps = {
  label?: (value: number) => JSX.Element;
  origin?: "center" | "start" | "end";
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onValueChange?: (value: number) => void;
  onValueChangeEnd?: (value: number) => void;
};

export const Slider = (props: SliderProps): JSX.Element => {
  return (
    <Root
      {...props}
      value={[props.value]}
      onValueChange={(v) => props.onValueChange?.(v.value[0])}
      onValueChangeEnd={(v) => props.onValueChangeEnd?.(v.value[0])}
    >
      <Label>{props.label?.(props.value)}</Label>
      <Control />
    </Root>
  );
};

/* -------------------------------------------------------------------------- */

const Root = (
  props: Partial<{
    origin: "center" | "start" | "end";
    min: number;
    max: number;
    step: number;
    value: number[];
    onValueChange: (details: SliderValueChangeDetails) => void;
    onValueChangeEnd: (details: SliderValueChangeDetails) => void;
    children: JSX.Element;
  }>,
): JSX.Element => {
  return (
    <ArkSlider.Root
      origin={props.origin}
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onValueChange={(v) => props.onValueChange?.(v)}
      onValueChangeEnd={(v) => props.onValueChangeEnd?.(v)}
      thumbSize={{ width: 20, height: 20 }}
      class="p-2"
    >
      {props.children}
    </ArkSlider.Root>
  );
};

/* -------------------------------------------------------------------------- */

const Label = (props: { children?: JSX.Element }): JSX.Element => {
  return <ArkSlider.Label class="block text-sm tabular-nums">{props.children}</ArkSlider.Label>;
};

/* -------------------------------------------------------------------------- */

const Control = (): JSX.Element => {
  return (
    <ArkSlider.Control class="group my-2">
      <Track />
      <Thumb />
    </ArkSlider.Control>
  );
};

const Track = (): JSX.Element => {
  const className = {
    _: "h-2.5 overflow-hidden rounded-full transition",
    bg: "bg-neutral-300 dark:bg-neutral-600",
    hoverBg: "group-hover:bg-neutral-400 dark:group-hover:bg-neutral-500",
    draggingBg: "data-dragging:bg-neutral-400 dark:data-dragging:bg-neutral-500",
  };

  return (
    <ArkSlider.Track class={joinObjectValues(className)}>
      <ArkSlider.Range class="h-2.5 bg-blue-500" />
    </ArkSlider.Track>
  );
};

const Thumb = (): JSX.Element => {
  const className = {
    _: "inset-0 my-auto size-5 rounded-full",
    bg: "bg-white",
    border: "border-2 border-blue-500",
    outline: "outline-offset-1 outline-blue-500/75 focus-visible:outline-2",
  };

  return (
    <ArkSlider.Thumb class={joinObjectValues(className)} index={0}>
      <ArkSlider.HiddenInput />
    </ArkSlider.Thumb>
  );
};
