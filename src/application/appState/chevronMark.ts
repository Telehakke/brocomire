const ChevronMarkEnum = { none: "none", left: "left", right: "right" } as const;

type ChevronMarkValue = (typeof ChevronMarkEnum)[keyof typeof ChevronMarkEnum];

/* -------------------------------------------------------------------------- */

declare const ChevronMarkBrand: unique symbol;

export type ChevronMark = ChevronMarkValue & { [ChevronMarkBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const create = (value: ChevronMarkValue): ChevronMark => {
  return value as ChevronMark;
};

export const isLeft = (input: ChevronMark): boolean => {
  return input === ChevronMarkEnum.left;
};

export const isRight = (input: ChevronMark): boolean => {
  return input === ChevronMarkEnum.right;
};
