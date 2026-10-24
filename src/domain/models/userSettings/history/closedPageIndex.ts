import { isNumber } from "../../utils/isNumber";

declare const ClosedPageIndexBrand: unique symbol;

export type ClosedPageIndex = number & { [ClosedPageIndexBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createClosedPageIndex = (value?: unknown): ClosedPageIndex => {
  if (!isNumber(value) || !validate(value)) return create(MIN);
  return create(value);
};

/* -------------------------------------------------------------------------- */

const MIN = 0;

const create = (value: number): ClosedPageIndex => {
  return value as ClosedPageIndex;
};

const validate = (value: number): boolean => {
  return value >= MIN;
};
