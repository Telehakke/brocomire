declare const ZoomPercentageBrand: unique symbol;

export type ZoomPercentage = number & { [ZoomPercentageBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type ZoomPercentageStore = Readonly<{
  get(): ZoomPercentage;

  set(value: ZoomPercentage): void;
}>;

/* -------------------------------------------------------------------------- */

export const ZoomPercentage = {
  MIN: 100,
  MAX: 1000,

  createSafe(value: number): ZoomPercentage {
    return create(Math.max(Math.min(value, this.MAX), this.MIN));
  },

  createMin(): ZoomPercentage {
    return create(this.MIN);
  },

  zoomOut(input: ZoomPercentage, amount: number): ZoomPercentage {
    return this.createSafe(input - amount);
  },

  zoomIn(input: ZoomPercentage, amount: number): ZoomPercentage {
    return this.createSafe(input + amount);
  },

  getStore: (
    getter: () => ZoomPercentage,
    setter: (value: ZoomPercentage) => void,
  ): ZoomPercentageStore => {
    return { get: () => getter(), set: (v) => setter(v) };
  },
} as const;

const create = (value: number): ZoomPercentage => {
  return value as ZoomPercentage;
};
