declare const ScrollPercentageBrand: unique symbol;

export type ScrollPercentage = number & { [ScrollPercentageBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 0;
export const CENTER = 50;
export const MAX = 100;

export const createSafe = (value?: number): ScrollPercentage => {
  if (value == null) return create(MIN);
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const createMin = (): ScrollPercentage => {
  return MIN as ScrollPercentage;
};

const create = (value: number): ScrollPercentage => {
  return value as ScrollPercentage;
};
