import { isBoolean } from "../../utils/isBoolean";

declare const ShouldShowSharpeningFilterButtonBrand: unique symbol;

export type ShouldShowSharpeningFilterButton = boolean & {
  [ShouldShowSharpeningFilterButtonBrand]: unknown;
};

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): ShouldShowSharpeningFilterButton => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (
  v1: ShouldShowSharpeningFilterButton,
  v2: ShouldShowSharpeningFilterButton,
): boolean => {
  return v1 === v2;
};

const create = (value: boolean): ShouldShowSharpeningFilterButton => {
  return value as ShouldShowSharpeningFilterButton;
};
