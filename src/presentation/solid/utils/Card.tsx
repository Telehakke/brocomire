import type { JSX } from "solid-js/jsx-runtime";
import { joinObjectValues } from "./joinObjectValues";

export const Card = (props: { footer?: JSX.Element; children: JSX.Element }): JSX.Element => {
  return (
    <div class="space-y-1">
      <Content>{props.children}</Content>
      <Footer {...props} />
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const Content = (props: { children: JSX.Element }): JSX.Element => {
  const className = {
    _: "rounded-lg ",
    bg: "bg-white dark:bg-neutral-800",
    divide: "divide-y divide-neutral-300 dark:divide-neutral-700",
  };

  return <div class={joinObjectValues(className)}>{props.children}</div>;
};

const Footer = (props: { footer?: JSX.Element }): JSX.Element => {
  const className = {
    _: "mx-2 text-xs whitespace-pre-wrap",
    text: "text-neutral-500 dark:text-neutral-400",
  };

  if (props.footer == null) return null;
  return <p class={joinObjectValues(className)}>{props.footer}</p>;
};
