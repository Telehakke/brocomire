declare const ScrollPercentageBrand: unique symbol;

export type ScrollPercentage = number & { [ScrollPercentageBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SCROLL_PERCENTAGE_MIN = 0;
export const SCROLL_PERCENTAGE_CENTER = 50;
export const SCROLL_PERCENTAGE_MAX = 100;

export const createScrollPercentage = (value?: number): ScrollPercentage => {
  if (value == null) return create(SCROLL_PERCENTAGE_MIN);
  return create(Math.max(Math.min(value, SCROLL_PERCENTAGE_MAX), SCROLL_PERCENTAGE_MIN));
};

/* -------------------------------------------------------------------------- */

const create = (value: number): ScrollPercentage => {
  return value as ScrollPercentage;
};
