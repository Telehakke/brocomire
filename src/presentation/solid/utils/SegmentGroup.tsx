import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/solid/segment-group";
import { For } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { joinObjectValues } from "./joinObjectValues";

export type SegmentGroupItem = {
  value: string;
  label: JSX.Element;
};

type SegmentGroupProps = Partial<{
  className: string;
  label: string;
  items: SegmentGroupItem[];
  value: string | null;
  onValueChange: (value: string | null) => void;
}>;

export const SegmentGroup = (props: SegmentGroupProps): JSX.Element => {
  return (
    <Root {...props}>
      <div class="flex items-center justify-between gap-2">
        <SegmentGroupLabel {...props} />
        <Indicator />
        <Items {...props} />
      </div>
    </Root>
  );
};

/* -------------------------------------------------------------------------- */

const Root = (
  props: Partial<{
    className: string;
    value: string | null;
    onValueChange: (value: string | null) => void;
    children: JSX.Element;
  }>,
): JSX.Element => {
  return (
    <ArkSegmentGroup.Root
      class={`block p-2 ${props.className}`}
      value={props.value}
      onValueChange={(v) => props.onValueChange?.(v.value)}
    >
      {props.children}
    </ArkSegmentGroup.Root>
  );
};

/* -------------------------------------------------------------------------- */

const SegmentGroupLabel = (props: { label?: JSX.Element }): JSX.Element => {
  return <ArkSegmentGroup.Label class="text-sm">{props.label}</ArkSegmentGroup.Label>;
};

/* -------------------------------------------------------------------------- */

const Indicator = (): JSX.Element => {
  const className = {
    _: "top-(--top) left-(--left) h-6.5 w-[calc(var(--width)-4px)] translate-0.5 rounded-full",
    bg: "bg-blue-500",
  };

  return <ArkSegmentGroup.Indicator class={joinObjectValues(className)} />;
};

/* -------------------------------------------------------------------------- */

const Items = (props: { items?: SegmentGroupItem[] }): JSX.Element => {
  const className = {
    _: "h-8 w-32.5 rounded-full",
    grid: "grid auto-cols-fr grid-flow-col",
    bg: "bg-white dark:bg-neutral-900",
    border: "border border-neutral-300 dark:border-neutral-600",
  };

  return (
    <div class={joinObjectValues(className)}>
      <For each={props.items}>{(item) => <Item item={item} />}</For>
    </div>
  );
};

const Item = (props: { item: SegmentGroupItem }): JSX.Element => {
  return (
    <ArkSegmentGroup.Item value={props.item.value}>
      <ItemText {...props} />
      <ArkSegmentGroup.ItemHiddenInput />
    </ArkSegmentGroup.Item>
  );
};

const ItemText = (props: { item: SegmentGroupItem }): JSX.Element => {
  const className = {
    _: "h-full rounded-full px-1.75 text-sm text-nowrap transition",
    grid: "grid place-items-center",
    position: "relative",
    text: "text-neutral-500 dark:text-neutral-400",
    hoverText: "hover:text-neutral-900 dark:hover:text-neutral-100",
    checkedText: "data-[state=checked]:text-neutral-100",
    outline: "-outline-offset-2 outline-blue-500/75 data-focus-visible:outline-2",
  };
  return (
    <ArkSegmentGroup.ItemText class={joinObjectValues(className)}>
      {props.item.label}
    </ArkSegmentGroup.ItemText>
  );
};
