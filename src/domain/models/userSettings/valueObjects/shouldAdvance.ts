import { isBoolean } from "../../utils/isBoolean";

declare const ShouldAdvanceBrand: unique symbol;

export type ShouldAdvance = boolean & { [ShouldAdvanceBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): ShouldAdvance => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ShouldAdvance, v2: ShouldAdvance): boolean => {
  return v1 === v2;
};

const create = (value: boolean): ShouldAdvance => {
  return value as ShouldAdvance;
};
