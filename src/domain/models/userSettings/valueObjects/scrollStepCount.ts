export const ScrollStepCountEnum = { four: "four", six: "six" } as const;

export type ScrollStepCountType = (typeof ScrollStepCountEnum)[keyof typeof ScrollStepCountEnum];

/* -------------------------------------------------------------------------- */

declare const ScrollStepCountBrand: unique symbol;

export type ScrollStepCount = ScrollStepCountType & { [ScrollStepCountBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ScrollStepCount = {
  DEFAULT: "four",

  createSafe(value?: unknown): ScrollStepCount {
    if (!isScrollStepCountType(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ScrollStepCount, v2: ScrollStepCount): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: ScrollStepCountType): ScrollStepCount => {
  return value as ScrollStepCount;
};

const isScrollStepCountType = (value: unknown): value is ScrollStepCountType => {
  return Object.keys(ScrollStepCountEnum).some((v) => v === value);
};
