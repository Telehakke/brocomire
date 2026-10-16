import { isString } from "../../utils/isString";

declare const BookIdBrand: unique symbol;

export type BookId = string & { [BookIdBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createSafe = (value?: unknown): BookId => {
  if (!isString(value)) return create("");
  return create(value);
};

export const equals = (v1: BookId, v2: BookId): boolean => {
  return v1 === v2;
};

const create = (value: string): BookId => {
  return value as BookId;
};
