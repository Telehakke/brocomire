import type { BookId } from "./bookId";
import { createHistory, equalsHistory, type History } from "./history";

declare const HistoryListBrand: unique symbol;

export type HistoryList = readonly History[] & { [HistoryListBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createHistoryList = (value?: unknown): HistoryList => {
  if (!Array.isArray(value)) return create([]);
  return create(toHistoryList(value));
};

/** bookIdに一致するリストの要素を更新した新しいリストを返す */
export const updateHistoryList = (input: HistoryList, history: History): HistoryList => {
  return create(input.map((v) => (equalsHistory(v, history) ? history : v)));
};

/** bookIdに紐付く最後に閉じたページのインデックスを返す */
export const getClosedPageIndex = (input: HistoryList, bookId: BookId): number | undefined => {
  return input.find((v) => v.bookId === bookId)?.closedPageIndex;
};

/**
 * 新たな履歴をリストの先頭に追加する（最大100件）\
 * すでに存在する場合、リストの先頭に移動する
 */
export const tryPrependHistoryList = (input: HistoryList, bookId: BookId): HistoryList => {
  const index = input.findIndex((v) => v.bookId === bookId);
  if (index === -1) return prepend(input, bookId);
  if (index === 0) return input;
  return moveToHead(input, index);
};

/* -------------------------------------------------------------------------- */

const create = (value: readonly History[]): HistoryList => {
  return value as HistoryList;
};

const toHistoryList = (array: Record<string, unknown>[]): History[] => {
  return array.map((v) => createHistory(v.bookId, v.closedPageIndex));
};

const prepend = (input: HistoryList, bookId: BookId): HistoryList => {
  const histories = [createHistory(bookId, 0), ...input];
  if (histories.length <= 100) return create(histories);
  return create(histories.slice(0, 100));
};

const moveToHead = (input: HistoryList, index: number): HistoryList => {
  const array = [...input];
  const [element] = array.splice(index, 1);
  array.unshift(element);
  return create(array);
};
