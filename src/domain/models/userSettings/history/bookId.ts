import { isString } from "../../utils/isString";

declare const BookIdBrand: unique symbol;

export type BookId = string & { [BookIdBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createBookId = (value?: unknown): BookId => {
  if (!isString(value)) return create("");
  return create(value);
};

/* -------------------------------------------------------------------------- */

const create = (value: string): BookId => {
  return value as BookId;
};
