import { isBoolean } from "../../utils/isBoolean";

declare const ShouldPreloadBrand: unique symbol;

export type ShouldPreload = boolean & { [ShouldPreloadBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ShouldPreload = {
  DEFAULT: false,

  createSafe(value?: unknown): ShouldPreload {
    if (!isBoolean(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ShouldPreload, v2: ShouldPreload): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: boolean): ShouldPreload => {
  return value as ShouldPreload;
};
