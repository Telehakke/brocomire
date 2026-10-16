import { isNumber } from "../../utils/isNumber";

declare const SafeAreaLengthBrand: unique symbol;

export type SafeAreaLength = number & { [SafeAreaLengthBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 0;
export const MAX = 100;
export const DEFAULT = 0;

export const createSafe = (value?: unknown): SafeAreaLength => {
  if (!isNumber(value)) return create(DEFAULT);
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const equals = (v1: SafeAreaLength, v2: SafeAreaLength): boolean => {
  return v1 === v2;
};

export const isMin = (input: number): boolean => {
  return input === MIN;
};

const create = (value: number): SafeAreaLength => {
  return value as SafeAreaLength;
};
