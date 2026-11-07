import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowInvertMonochromeButtonBrand: unique symbol;

export type ShouldShowInvertMonochromeButton = boolean & {
  [ShouldShowInvertMonochromeButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const SHOULD_SHOW_INVERT_MONOCHROME_BUTTON_DEFAULT = false;

export const createShouldShowInvertMonochromeButton = (
  value?: unknown,
): ShouldShowInvertMonochromeButton => {
  if (!isBoolean(value)) return create(SHOULD_SHOW_INVERT_MONOCHROME_BUTTON_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldShowInvertMonochromeButton => {
  return value as ShouldShowInvertMonochromeButton;
};
