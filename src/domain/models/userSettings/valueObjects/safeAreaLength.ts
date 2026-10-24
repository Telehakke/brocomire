import { isNumber } from "../../utils/isNumber";

declare const SafeAreaLengthBrand: unique symbol;

export type SafeAreaLength = number & { [SafeAreaLengthBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SAFE_AREA_LENGTH_MIN = 0;
export const SAFE_AREA_LENGTH_MAX = 100;
export const SAFE_AREA_LENGTH_DEFAULT = 0;

export const createSafeAreaLength = (value?: unknown): SafeAreaLength => {
  if (!isNumber(value)) return create(SAFE_AREA_LENGTH_DEFAULT);
  return create(Math.max(Math.min(value, SAFE_AREA_LENGTH_MAX), SAFE_AREA_LENGTH_MIN));
};

/* -------------------------------------------------------------------------- */

const create = (value: number): SafeAreaLength => {
  return value as SafeAreaLength;
};
