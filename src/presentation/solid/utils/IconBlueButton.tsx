import type { JSX } from "solid-js/jsx-runtime";
import { joinObjectValues } from "./joinObjectValues";

const className = {
  _: "size-10 p-2 transition",
  bg: "bg-blue-300/75",
  hoverBg: "group-hover:bg-blue-400/75",
  activeBg: " group-active:bg-blue-500/75",
  stroke: "stroke-black",
};

export const IconBlueButton = {
  className,
  Button: (props: { onClick: () => void; children: JSX.Element }): JSX.Element => {
    const className = {
      _: "group overflow-clip rounded-full transition select-none",
      outline: "outline-blue-500/75 focus-visible:outline-2",
    };

    return (
      <button class={joinObjectValues(className)} onClick={props.onClick}>
        {props.children}
      </button>
    );
  },
} as const;
