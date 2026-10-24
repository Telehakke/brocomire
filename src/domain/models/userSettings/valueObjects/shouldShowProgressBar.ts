import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowProgressBarBrand: unique symbol;

export type ShouldShowProgressBar = boolean & {
  [ShouldShowProgressBarBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const SHOULD_SHOW_PROGRESS_BAR_DEFAULT = false;

export const createShouldShowProgressBar = (value?: unknown): ShouldShowProgressBar => {
  if (!isBoolean(value)) return create(SHOULD_SHOW_PROGRESS_BAR_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldShowProgressBar => {
  return value as ShouldShowProgressBar;
};
