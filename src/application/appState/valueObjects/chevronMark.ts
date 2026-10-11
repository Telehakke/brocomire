const ChevronMarkEnum = { none: "none", left: "left", right: "right" } as const;

type ChevronMarkType = (typeof ChevronMarkEnum)[keyof typeof ChevronMarkEnum];

/* -------------------------------------------------------------------------- */

declare const ChevronMarkBrand: unique symbol;

export type ChevronMark = ChevronMarkType & { [ChevronMarkBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ChevronMark = {
  create(value: ChevronMarkType): ChevronMark {
    return value as ChevronMark;
  },

  equals(v1: ChevronMark, v2: ChevronMark): boolean {
    return v1 === v2;
  },

  isLeft(input: ChevronMark): boolean {
    return input === ChevronMarkEnum.left;
  },

  isRight(input: ChevronMark): boolean {
    return input === ChevronMarkEnum.right;
  },
} as const;
