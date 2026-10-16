const ContentFitEnum = { all: "all", fill: "fill" } as const;

export type ContentFitValue = (typeof ContentFitEnum)[keyof typeof ContentFitEnum];

/* -------------------------------------------------------------------------- */

declare const ContentFitBrand: unique symbol;

export type ContentFit = ContentFitValue & { [ContentFitBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = ContentFitEnum.all;

export const createSafe = (value?: unknown): ContentFit => {
  if (!isContentFitValue(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: ContentFit, v2: ContentFit): boolean => {
  return v1 === v2;
};

export const getValues = (): readonly ContentFitValue[] => {
  return Object.values(ContentFitEnum);
};

const create = (value: ContentFitValue): ContentFit => {
  return value as ContentFit;
};

const isContentFitValue = (value: unknown): value is ContentFitValue => {
  return Object.keys(ContentFitEnum).some((v) => v === value);
};
