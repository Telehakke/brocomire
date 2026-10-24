import { isNumber } from "../../utils/isNumber";

declare const MenuOpacityBrand: unique symbol;

export type MenuOpacity = number & { [MenuOpacityBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MENU_OPACITY_MIN = 10;
export const MENU_OPACITY_MAX = 100;
export const MENU_OPACITY_DEFAULT = 75;

export const createMenuOpacity = (value?: unknown): MenuOpacity => {
  if (!isNumber(value)) return create(MENU_OPACITY_DEFAULT);
  return create(Math.max(Math.min(value, MENU_OPACITY_MAX), MENU_OPACITY_MIN));
};

/* -------------------------------------------------------------------------- */

const create = (value: number): MenuOpacity => {
  return value as MenuOpacity;
};
