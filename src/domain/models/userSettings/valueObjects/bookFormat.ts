export const BookFormatEnum = { vertical: "vertical", horizontal: "horizontal" } as const;

export type BookFormatType = (typeof BookFormatEnum)[keyof typeof BookFormatEnum];

/* -------------------------------------------------------------------------- */

declare const BookFormatBrand: unique symbol;

export type BookFormat = BookFormatType & { [BookFormatBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const BookFormat = {
  DEFAULT: BookFormatEnum.vertical,

  createSafe(value?: unknown): BookFormat {
    if (!isBookFormatType(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: BookFormat, v2: BookFormat): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: BookFormatType): BookFormat => {
  return value as BookFormat;
};

const isBookFormatType = (value: unknown): value is BookFormatType => {
  return Object.keys(BookFormatEnum).some((v) => v === value);
};
