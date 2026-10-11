import { isNumber } from "../../utils/isNumber";

declare const SafeAreaLengthBrand: unique symbol;

export type SafeAreaLength = number & { [SafeAreaLengthBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SafeAreaLength = {
  MIN: 0,
  MAZ: 100,
  DEFAULT: 0,

  createSafe(value?: unknown): SafeAreaLength {
    if (!isNumber(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: SafeAreaLength, v2: SafeAreaLength): boolean {
    return v1 === v2;
  },

  isMin(input: SafeAreaLength): boolean {
    return input === this.MIN;
  },
} as const;

const create = (value: number): SafeAreaLength => {
  return value as SafeAreaLength;
};
