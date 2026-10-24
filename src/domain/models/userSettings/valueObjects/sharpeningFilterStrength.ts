import { isNumber } from "../../utils/isNumber";

declare const SharpeningFilterStrengthBrand: unique symbol;

export type SharpeningFilterStrength = number & { [SharpeningFilterStrengthBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SHARPENING_FILTER_STRENGTH_MIN = 1;
export const SHARPENING_FILTER_STRENGTH_MAX = 10;
export const SHARPENING_FILTER_STRENGTH_DEFAULT = 3;

export const createSharpeningFilterStrength = (value?: unknown): SharpeningFilterStrength => {
  if (!isNumber(value)) return create(SHARPENING_FILTER_STRENGTH_DEFAULT);
  return create(
    Math.max(Math.min(value, SHARPENING_FILTER_STRENGTH_MAX), SHARPENING_FILTER_STRENGTH_MIN),
  );
};

/* -------------------------------------------------------------------------- */

const create = (value: number): SharpeningFilterStrength => {
  return value as SharpeningFilterStrength;
};
