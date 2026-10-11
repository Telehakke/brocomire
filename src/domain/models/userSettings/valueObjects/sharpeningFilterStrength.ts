import { isNumber } from "../../utils/isNumber";

declare const SharpeningFilterStrengthBrand: unique symbol;

export type SharpeningFilterStrength = number & { [SharpeningFilterStrengthBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SharpeningFilterStrength = {
  MIN: 1,
  MAX: 10,
  DEFAULT: 3,

  createSafe(value?: unknown): SharpeningFilterStrength {
    if (!isNumber(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: SharpeningFilterStrength, v2: SharpeningFilterStrength): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: number): SharpeningFilterStrength => {
  return value as SharpeningFilterStrength;
};
