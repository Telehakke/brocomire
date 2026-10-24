import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowInvertButtonBrand: unique symbol;

export type ShouldShowInvertButton = boolean & { [ShouldShowInvertButtonBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SHOULD_SHOW_INVERT_BUTTON_DEFAULT = false;

export const createShouldShowInvertButton = (value?: unknown): ShouldShowInvertButton => {
  if (!isBoolean(value)) return create(SHOULD_SHOW_INVERT_BUTTON_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldShowInvertButton => {
  return value as ShouldShowInvertButton;
};
