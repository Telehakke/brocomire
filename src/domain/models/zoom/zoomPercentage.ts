declare const ZoomPercentageBrand: unique symbol;

export type ZoomPercentage = number & { [ZoomPercentageBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type ZoomPercentageStore = Readonly<{
  get(): ZoomPercentage;
  set(value: ZoomPercentage): void;
}>;

/* -------------------------------------------------------------------------- */

export const ZOOM_PERCENTAGE_MIN = 100;
export const ZOOM_PERCENTAGE_MAX = 1000;

export const createZoomPercentage = (value: number): ZoomPercentage => {
  return create(Math.max(Math.min(value, ZOOM_PERCENTAGE_MAX), ZOOM_PERCENTAGE_MIN));
};

export const addZoomPercentage = (input: ZoomPercentage, amount: number): ZoomPercentage => {
  return create(Math.min(input + amount, ZOOM_PERCENTAGE_MAX));
};

export const subZoomPercentage = (input: ZoomPercentage, amount: number): ZoomPercentage => {
  return create(Math.max(input - amount, ZOOM_PERCENTAGE_MIN));
};

export const getZoomPercentageStore = (
  getter: () => ZoomPercentage,
  setter: (value: ZoomPercentage) => void,
): ZoomPercentageStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

/* -------------------------------------------------------------------------- */

const create = (value: number): ZoomPercentage => {
  return value as ZoomPercentage;
};
