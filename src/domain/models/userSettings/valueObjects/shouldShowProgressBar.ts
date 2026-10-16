import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowProgressBarBrand: unique symbol;

export type ShouldShowProgressBar = boolean & {
  [ShouldShowProgressBarBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): ShouldShowProgressBar => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ShouldShowProgressBar, v2: ShouldShowProgressBar): boolean => {
  return v1 === v2;
};

const create = (value: boolean): ShouldShowProgressBar => {
  return value as ShouldShowProgressBar;
};
