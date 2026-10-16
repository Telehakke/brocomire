const ScrollStepCountEnum = { four: "four", six: "six" } as const;

export type ScrollStepCountValue = (typeof ScrollStepCountEnum)[keyof typeof ScrollStepCountEnum];

/* -------------------------------------------------------------------------- */

declare const ScrollStepCountBrand: unique symbol;

export type ScrollStepCount = ScrollStepCountValue & { [ScrollStepCountBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = ScrollStepCountEnum.four;

export const createSafe = (value?: unknown): ScrollStepCount => {
  if (!isScrollStepCountValue(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ScrollStepCount, v2: ScrollStepCount): boolean => {
  return v1 === v2;
};

export const getValues = (): readonly ScrollStepCountValue[] => {
  return Object.values(ScrollStepCountEnum);
};

const create = (value: ScrollStepCountValue): ScrollStepCount => {
  return value as ScrollStepCount;
};

const isScrollStepCountValue = (value: unknown): value is ScrollStepCountValue => {
  return Object.keys(ScrollStepCountEnum).some((v) => v === value);
};
