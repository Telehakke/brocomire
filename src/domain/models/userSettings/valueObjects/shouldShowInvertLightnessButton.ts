import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowInvertLightnessButtonBrand: unique symbol;

export type ShouldShowInvertLightnessButton = boolean & {
  [ShouldShowInvertLightnessButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const SHOULD_SHOW_INVERT_LIGHTNESS_BUTTON_DEFAULT = false;

export const createShouldShowInvertLightnessButton = (
  value?: unknown,
): ShouldShowInvertLightnessButton => {
  if (!isBoolean(value)) return create(SHOULD_SHOW_INVERT_LIGHTNESS_BUTTON_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldShowInvertLightnessButton => {
  return value as ShouldShowInvertLightnessButton;
};
