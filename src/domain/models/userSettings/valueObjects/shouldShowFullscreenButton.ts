import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowFullscreenButtonBrand: unique symbol;

export type ShouldShowFullscreenButton = boolean & {
  [ShouldShowFullscreenButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): ShouldShowFullscreenButton => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ShouldShowFullscreenButton, v2: ShouldShowFullscreenButton): boolean => {
  return v1 === v2;
};

const create = (value: boolean): ShouldShowFullscreenButton => {
  return value as ShouldShowFullscreenButton;
};
