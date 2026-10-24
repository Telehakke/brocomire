import { isNumber } from "../../utils/isNumber";

declare const ScrollSpeedBrand: unique symbol;

export type ScrollSpeed = number & { [ScrollSpeedBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SCROLL_SPEED_MIN = 1;
export const SCROLL_SPEED_MAX = 10;
export const SCROLL_SPEED_DEFAULT = 4;

export const createScrollSpeed = (value?: unknown): ScrollSpeed => {
  if (!isNumber(value)) return create(SCROLL_SPEED_DEFAULT);
  return create(Math.max(Math.min(value, SCROLL_SPEED_MAX), SCROLL_SPEED_MIN));
};

/* -------------------------------------------------------------------------- */

const create = (value: number): ScrollSpeed => {
  return value as ScrollSpeed;
};
