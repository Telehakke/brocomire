import { isString } from "../../utils/isString";

declare const BookIdBrand: unique symbol;

export type BookId = string & { [BookIdBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const BookId = {
  createSafe(value?: unknown): BookId {
    if (!isString(value)) return create("");
    return create(value);
  },

  equals(v1: BookId, v2: BookId): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: string): BookId => {
  return value as BookId;
};
