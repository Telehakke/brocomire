export const ContentFitEnum = { all: "all", fill: "fill" } as const;

export type ContentFitValue = (typeof ContentFitEnum)[keyof typeof ContentFitEnum];

/* -------------------------------------------------------------------------- */

declare const ContentFitBrand: unique symbol;

export type ContentFit = ContentFitValue & { [ContentFitBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const CONTENT_FIT_DEFAULT = ContentFitEnum.all;

export const createContentFit = (value?: unknown): ContentFit => {
  if (!isContentFitValue(value)) return create(CONTENT_FIT_DEFAULT);
  return create(value);
};

export const getContentFitValues = (): readonly ContentFitValue[] => {
  return values;
};

/* -------------------------------------------------------------------------- */

const values = Object.values(ContentFitEnum);

const create = (value: ContentFitValue): ContentFit => {
  return value as ContentFit;
};

const isContentFitValue = (value: unknown): value is ContentFitValue => {
  return values.some((v) => v === value);
};
