import { isNumber } from "../../utils/isNumber";

declare const ZoomStepBrand: unique symbol;

export type ZoomStep = number & { [ZoomStepBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ZOOM_STEP_MIN = 10;
export const ZOOM_STEP_MAX = 200;
export const ZOOM_STEP_DEFAULT = 50;

export const createZoomStep = (value?: unknown): ZoomStep => {
  if (!isNumber(value)) return create(ZOOM_STEP_DEFAULT);
  return create(Math.max(Math.min(value, ZOOM_STEP_MAX), ZOOM_STEP_MIN));
};

/* -------------------------------------------------------------------------- */

const create = (value: number): ZoomStep => {
  return value as ZoomStep;
};
