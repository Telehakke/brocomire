import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowFullscreenButtonBrand: unique symbol;

export type ShouldShowFullscreenButton = boolean & {
  [ShouldShowFullscreenButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT = false;

export const createShouldShowFullscreenButton = (value?: unknown): ShouldShowFullscreenButton => {
  if (!isBoolean(value)) return create(SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldShowFullscreenButton => {
  return value as ShouldShowFullscreenButton;
};
