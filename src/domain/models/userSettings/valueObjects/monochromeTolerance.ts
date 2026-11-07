import { isNumber } from "../../utils/isNumber";

declare const MonochromeToleranceBrand: unique symbol;

export type MonochromeTolerance = number & { [MonochromeToleranceBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MONOCHROME_TOLERANCE_MIN = 0;
export const MONOCHROME_TOLERANCE_MAX = 30;
export const MONOCHROME_TOLERANCE_DEFAULT = 15;

export const createMonochromeTolerance = (value?: unknown): MonochromeTolerance => {
  if (!isNumber(value)) return create(MONOCHROME_TOLERANCE_DEFAULT);
  return create(Math.max(Math.min(value, MONOCHROME_TOLERANCE_MAX), MONOCHROME_TOLERANCE_MIN));
};

/* -------------------------------------------------------------------------- */

const create = (value: number): MonochromeTolerance => {
  return value as MonochromeTolerance;
};
