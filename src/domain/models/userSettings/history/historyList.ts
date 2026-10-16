import * as BookId from "./bookId";
import * as History from "./history";

declare const HistoryListBrand: unique symbol;

export type HistoryList = readonly History.History[] & { [HistoryListBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createSafe = (value?: unknown): HistoryList => {
  if (!Array.isArray(value)) return create([]);
  return create(toHistoryList(value));
};

export const equals = (v1: HistoryList, v2: HistoryList): boolean => {
  if (v1.length !== v2.length) return false;
  return v1.every((v, i) => History.equals(v, v2[i]));
};

/** 履歴を更新した新しいインスタンスを返す */
export const update = (input: HistoryList, history: History.History): HistoryList => {
  return create(input.map((v) => (History.equals(v, history) ? history : v)));
};

/** bookIdに紐付く最後に閉じたページのインデックスを返す */
export const getClosedPageIndex = (
  input: HistoryList,
  bookId: BookId.BookId,
): number | undefined => {
  return input.find((v) => BookId.equals(v.bookId, bookId))?.closedPageIndex;
};

/**
 * 新たな履歴をリストの先頭に追加する（最大100件）\
 * すでに存在する場合、リストの先頭に移動する
 */
export const tryPrepend = (input: HistoryList, bookId: BookId.BookId): HistoryList => {
  const index = input.findIndex((v) => BookId.equals(v.bookId, bookId));
  if (index === -1) return prepend(input, bookId);
  if (index === 0) return input;
  return moveToHead(input, index);
};

const create = (value: readonly History.History[]): HistoryList => {
  return value as HistoryList;
};

const toHistoryList = (array: Record<string, unknown>[]): History.History[] => {
  return array.map((v) => History.createSafe(v.bookId, v.closedPageIndex));
};

const prepend = (input: HistoryList, bookId: BookId.BookId): HistoryList => {
  const histories = [History.createSafe(bookId), ...input];
  if (histories.length <= 100) return create(histories);
  return create(histories.slice(0, 100));
};

const moveToHead = (input: HistoryList, index: number): HistoryList => {
  const array = [...input];
  const [element] = array.splice(index, 1);
  array.unshift(element);
  return create(array);
};
