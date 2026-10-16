import { isNumber } from "../../utils/isNumber";

declare const SharpeningFilterStrengthBrand: unique symbol;

export type SharpeningFilterStrength = number & { [SharpeningFilterStrengthBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 1;
export const MAX = 10;
export const DEFAULT = 3;

export const createSafe = (value?: unknown): SharpeningFilterStrength => {
  if (!isNumber(value)) return create(DEFAULT);
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const equals = (v1: SharpeningFilterStrength, v2: SharpeningFilterStrength): boolean => {
  return v1 === v2;
};

const create = (value: number): SharpeningFilterStrength => {
  return value as SharpeningFilterStrength;
};
