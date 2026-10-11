import { isNumber } from "../../utils/isNumber";

declare const ScrollSpeedBrand: unique symbol;

export type ScrollSpeed = number & { [ScrollSpeedBrand]: unknown };
/* -------------------------------------------------------------------------- */

export const ScrollSpeed = {
  MIN: 1,
  MAX: 10,
  DEFAULT: 4,

  createSafe(value?: unknown): ScrollSpeed {
    if (!isNumber(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ScrollSpeed, v2: ScrollSpeed): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: number): ScrollSpeed => {
  return value as ScrollSpeed;
};
