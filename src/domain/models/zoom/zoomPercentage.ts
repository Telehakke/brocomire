declare const ZoomPercentageBrand: unique symbol;

export type ZoomPercentage = number & { [ZoomPercentageBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type ZoomPercentageStore = Readonly<{
  get(): ZoomPercentage;
  set(value: ZoomPercentage): void;
}>;

/* -------------------------------------------------------------------------- */

export const MIN = 100;
export const MAX = 1000;

export const createSafe = (value: number): ZoomPercentage => {
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const createMin = (): ZoomPercentage => {
  return create(MIN);
};

export const zoomOut = (input: ZoomPercentage, amount: number): ZoomPercentage => {
  return create(Math.max(input - amount, MIN));
};

export const zoomIn = (input: ZoomPercentage, amount: number): ZoomPercentage => {
  return create(Math.min(input + amount, MAX));
};

export const isMin = (input: ZoomPercentage): boolean => {
  return input === MIN;
};

export const isMax = (input: ZoomPercentage): boolean => {
  return input === MAX;
};

export const getStore = (
  getter: () => ZoomPercentage,
  setter: (value: ZoomPercentage) => void,
): ZoomPercentageStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

const create = (value: number): ZoomPercentage => {
  return value as ZoomPercentage;
};
