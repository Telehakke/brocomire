import { isNumber } from "../../utils/isNumber";

declare const ScrollSpeedBrand: unique symbol;

export type ScrollSpeed = number & { [ScrollSpeedBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 1;
export const MAX = 10;
export const DEFAULT = 4;

export const createSafe = (value?: unknown): ScrollSpeed => {
  if (!isNumber(value)) return create(DEFAULT);
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const equals = (v1: ScrollSpeed, v2: ScrollSpeed): boolean => {
  return v1 === v2;
};

const create = (value: number): ScrollSpeed => {
  return value as ScrollSpeed;
};
