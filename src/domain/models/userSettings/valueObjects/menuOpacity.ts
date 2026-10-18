import { isNumber } from "../../utils/isNumber";

declare const MenuOpacityBrand: unique symbol;

export type MenuOpacity = number & { [MenuOpacityBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 10;
export const MAX = 100;
export const DEFAULT = 75;

export const createSafe = (value?: unknown): MenuOpacity => {
  if (!isNumber(value)) return create(DEFAULT);
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const equals = (v1: MenuOpacity, v2: MenuOpacity): boolean => {
  return v1 === v2;
};

const create = (value: number): MenuOpacity => {
  return value as MenuOpacity;
};
