declare const ScrollPercentageBrand: unique symbol;

export type ScrollPercentage = number & { [ScrollPercentageBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ScrollPercentage = {
  MIN: 0,
  CENTER: 50,
  MAX: 100,

  createSafe(value?: number): ScrollPercentage {
    if (value == null) return create(this.MIN);
    return create(Math.max(Math.min(value, this.MAX), this.MIN));
  },

  equals(v1: ScrollPercentage, v2: ScrollPercentage): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: number): ScrollPercentage => {
  return value as ScrollPercentage;
};
