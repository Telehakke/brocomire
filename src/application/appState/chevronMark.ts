export const ChevronMarkEnum = { none: "none", left: "left", right: "right" } as const;

type ChevronMarkValue = (typeof ChevronMarkEnum)[keyof typeof ChevronMarkEnum];

/* -------------------------------------------------------------------------- */

declare const ChevronMarkBrand: unique symbol;

export type ChevronMark = ChevronMarkValue & { [ChevronMarkBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createChevronMark = (value: ChevronMarkValue): ChevronMark => {
  return value as ChevronMark;
};
