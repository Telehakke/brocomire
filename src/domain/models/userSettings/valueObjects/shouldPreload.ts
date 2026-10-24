import { isBoolean } from "../../utils/isBoolean";

declare const ShouldPreloadBrand: unique symbol;

export type ShouldPreload = boolean & { [ShouldPreloadBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SHOULD_PRELOAD_DEFAULT = false;

export const createShouldPreload = (value?: unknown): ShouldPreload => {
  if (!isBoolean(value)) return create(SHOULD_PRELOAD_DEFAULT);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: boolean): ShouldPreload => {
  return value as ShouldPreload;
};
