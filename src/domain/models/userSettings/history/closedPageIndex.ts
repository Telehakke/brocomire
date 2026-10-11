import { isNumber } from "../../utils/isNumber";

declare const ClosedPageIndexBrand: unique symbol;

export type ClosedPageIndex = number & { [ClosedPageIndexBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ClosedPageIndex = {
  MIN: 0,
  createSafe(value?: unknown): ClosedPageIndex {
    if (!isNumber(value) || !validate(value)) return create(this.MIN);
    return create(value);
  },

  equals(v1: ClosedPageIndex, v2: ClosedPageIndex): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: number): ClosedPageIndex => {
  return value as ClosedPageIndex;
};

const validate = (value: number): boolean => {
  return value >= ClosedPageIndex.MIN;
};
