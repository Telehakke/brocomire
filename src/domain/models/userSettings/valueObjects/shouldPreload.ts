import { isBoolean } from "../../utils/isBoolean";

declare const ShouldPreloadBrand: unique symbol;

export type ShouldPreload = boolean & { [ShouldPreloadBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = false;

export const createSafe = (value?: unknown): ShouldPreload => {
  if (!isBoolean(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ShouldPreload, v2: ShouldPreload): boolean => {
  return v1 === v2;
};

const create = (value: boolean): ShouldPreload => {
  return value as ShouldPreload;
};
