declare const BookmarkIndexBrand: unique symbol;

type BookmarkIndex = (number & { [BookmarkIndexBrand]: unknown }) | undefined;

/* -------------------------------------------------------------------------- */

export type BookmarkIndexStore = Readonly<{
  get(): BookmarkIndex;
  set(value: BookmarkIndex): void;
}>;

/* -------------------------------------------------------------------------- */

export const create = (value?: number): BookmarkIndex => {
  return value as BookmarkIndex;
};

export const getStore = (
  getter: () => BookmarkIndex,
  setter: (value: BookmarkIndex) => void,
): BookmarkIndexStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
