import { isBoolean } from "../../utils/isBoolean";

declare const ShouldAdvanceBrand: unique symbol;

export type ShouldAdvance = boolean & { [ShouldAdvanceBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ShouldAdvance = {
  DEFAULT: false,

  createSafe(value?: unknown): ShouldAdvance {
    if (!isBoolean(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ShouldAdvance, v2: ShouldAdvance): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: boolean): ShouldAdvance => {
  return value as ShouldAdvance;
};
