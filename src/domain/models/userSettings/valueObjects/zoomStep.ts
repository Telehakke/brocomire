import { isNumber } from "../../utils/isNumber";

declare const ZoomStepBrand: unique symbol;

export type ZoomStep = number & { [ZoomStepBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 10;
export const MAX = 200;
export const DEFAULT = 50;

export const createSafe = (value?: unknown): ZoomStep => {
  if (!isNumber(value)) return create(DEFAULT);
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const equals = (v1: ZoomStep, v2: ZoomStep): boolean => {
  return v1 === v2;
};

const create = (value: number): ZoomStep => {
  return value as ZoomStep;
};
