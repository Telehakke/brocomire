export const ScrollStepCountEnum = { four: "four", six: "six" } as const;

export type ScrollStepCountValue = (typeof ScrollStepCountEnum)[keyof typeof ScrollStepCountEnum];

/* -------------------------------------------------------------------------- */

declare const ScrollStepCountBrand: unique symbol;

export type ScrollStepCount = ScrollStepCountValue & { [ScrollStepCountBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const SCROLL_STEP_COUNT_DEFAULT = ScrollStepCountEnum.four;

export const createScrollStepCount = (value?: unknown): ScrollStepCount => {
  if (!isScrollStepCountValue(value)) return create(SCROLL_STEP_COUNT_DEFAULT);
  return create(value);
};

export const getScrollStepCountValues = (): readonly ScrollStepCountValue[] => {
  return values;
};

/* -------------------------------------------------------------------------- */

const values = Object.values(ScrollStepCountEnum);

const create = (value: ScrollStepCountValue): ScrollStepCount => {
  return value as ScrollStepCount;
};

const isScrollStepCountValue = (value: unknown): value is ScrollStepCountValue => {
  return values.some((v) => v === value);
};
