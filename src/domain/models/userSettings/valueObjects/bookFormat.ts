export const BookFormatEnum = { vertical: "vertical", horizontal: "horizontal" } as const;

export type BookFormatValue = (typeof BookFormatEnum)[keyof typeof BookFormatEnum];

/* -------------------------------------------------------------------------- */

declare const BookFormatBrand: unique symbol;

export type BookFormat = BookFormatValue & { [BookFormatBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const DEFAULT = BookFormatEnum.vertical;

export const createSafe = (value?: unknown): BookFormat => {
  if (!isBookFormatValue(value)) return create(DEFAULT);
  return create(value);
};

export const equals = (v1: BookFormat, v2: BookFormat): boolean => {
  return v1 === v2;
};

export const isVertical = (input: BookFormat): boolean => {
  return input === BookFormatEnum.vertical;
};

export const getValues = (): readonly BookFormatValue[] => {
  return Object.values(BookFormatEnum);
};

const create = (value: BookFormatValue): BookFormat => {
  return value as BookFormat;
};

const isBookFormatValue = (value: unknown): value is BookFormatValue => {
  return Object.values(BookFormatEnum).some((v) => v === value);
};
