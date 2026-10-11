import { isNumber } from "../../utils/isNumber";

declare const ZoomStepBrand: unique symbol;

export type ZoomStep = number & { [ZoomStepBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ZoomStep = {
  MIN: 10,
  MAX: 200,
  DEFAULT: 50,

  createSafe(value?: unknown): ZoomStep {
    if (!isNumber(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ZoomStep, v2: ZoomStep): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: number): ZoomStep => {
  return value as ZoomStep;
};
