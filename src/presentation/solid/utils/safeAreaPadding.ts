import type { JSX } from "solid-js/h/jsx-runtime";

export const safeAreaPaddingLeft: JSX.CSSProperties = {
  "padding-left": "env(safe-area-inset-left,0)",
};

export const safeAreaPaddingRight: JSX.CSSProperties = {
  "padding-right": "env(safe-area-inset-right,0)",
};

export const safeAreaPaddingTop: JSX.CSSProperties = {
  "padding-top": "env(safe-area-inset-top,0)",
};

export const safeAreaPaddingBottom: JSX.CSSProperties = {
  "padding-bottom": "env(safe-area-inset-bottom,0)",
};
