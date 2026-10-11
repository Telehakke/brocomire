export const ContentFitEnum = { all: "all", fill: "fill" } as const;

export type ContentFitType = (typeof ContentFitEnum)[keyof typeof ContentFitEnum];

/* -------------------------------------------------------------------------- */

declare const ContentFitBrand: unique symbol;

export type ContentFit = ContentFitType & { [ContentFitBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const ContentFit = {
  DEFAULT: ContentFitEnum.all,

  createSafe(value?: unknown): ContentFit {
    if (!isContentFitType(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: ContentFit, v2: ContentFit): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: ContentFitType): ContentFit => {
  return value as ContentFit;
};

const isContentFitType = (value: unknown): value is ContentFitType => {
  return Object.keys(ContentFitEnum).some((v) => v === value);
};
