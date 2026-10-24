export const BookFormatEnum = { vertical: "vertical", horizontal: "horizontal" } as const;

export type BookFormatValue = (typeof BookFormatEnum)[keyof typeof BookFormatEnum];

/* -------------------------------------------------------------------------- */

declare const BookFormatBrand: unique symbol;

export type BookFormat = BookFormatValue & { [BookFormatBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const BOOK_FORMAT_DEFAULT = BookFormatEnum.vertical;

export const createBookFormat = (value?: unknown): BookFormat => {
  if (!isBookFormatValue(value)) return create(BOOK_FORMAT_DEFAULT);
  return create(value);
};

export const getBookFormatValues = (): readonly BookFormatValue[] => {
  return values;
};

/* -------------------------------------------------------------------------- */

const values = Object.values(BookFormatEnum);

const create = (value: BookFormatValue): BookFormat => {
  return value as BookFormat;
};

const isBookFormatValue = (value: unknown): value is BookFormatValue => {
  return values.some((v) => v === value);
};
