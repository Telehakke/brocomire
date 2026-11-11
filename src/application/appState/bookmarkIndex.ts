declare const BookmarkIndexBrand: unique symbol;

type BookmarkIndex = (number & { [BookmarkIndexBrand]: unknown }) | undefined;

export type BookmarkIndexSetter = (value: BookmarkIndex) => void;

/* -------------------------------------------------------------------------- */

export const createBookmarkIndex = (value?: number): BookmarkIndex => {
  return value as BookmarkIndex;
};
