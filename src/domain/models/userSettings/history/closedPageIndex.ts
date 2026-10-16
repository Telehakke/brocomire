import { isNumber } from "../../utils/isNumber";

declare const ClosedPageIndexBrand: unique symbol;

export type ClosedPageIndex = number & { [ClosedPageIndexBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 0;

export const createSafe = (value?: unknown): ClosedPageIndex => {
  if (!isNumber(value) || !validate(value)) return create(MIN);
  return create(value);
};

const create = (value: number): ClosedPageIndex => {
  return value as ClosedPageIndex;
};

const validate = (value: number): boolean => {
  return value >= MIN;
};
