import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowInvertButtonBrand: unique symbol;

export type ShouldShowInvertButton = boolean & { [ShouldShowInvertButtonBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): ShouldShowInvertButton => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ShouldShowInvertButton, v2: ShouldShowInvertButton): boolean => {
  return v1 === v2;
};

const create = (value: boolean): ShouldShowInvertButton => {
  return value as ShouldShowInvertButton;
};
