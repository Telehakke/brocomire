import { isBoolean } from "../../utils/isBoolean";

declare const ShouldAdvanceBrand: unique symbol;

export type ShouldAdvance = boolean & { [ShouldAdvanceBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SHOULD_ADVANCE_DEFAULT = false;

export const createShouldAdvance = (value?: unknown): ShouldAdvance => {
  if (!isBoolean(value)) return create(SHOULD_ADVANCE_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldAdvance => {
  return value as ShouldAdvance;
};
