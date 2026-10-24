import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowSharpeningFilterButtonBrand: unique symbol;

export type ShouldShowSharpeningFilterButton = boolean & {
  [ShouldShowSharpeningFilterButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT = false;

export const createShouldShowSharpeningFilterButton = (
  value?: unknown,
): ShouldShowSharpeningFilterButton => {
  if (!isBoolean(value)) return create(SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldShowSharpeningFilterButton => {
  return value as ShouldShowSharpeningFilterButton;
};
