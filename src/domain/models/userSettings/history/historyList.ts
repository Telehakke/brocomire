import { BookId } from "./bookId";
import { ClosedPageIndex } from "./closedPageIndex";
import { History } from "./history";

declare const HistoryListBrand: unique symbol;

export type HistoryList = readonly History[] & { [HistoryListBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const HistoryList = {
  createSafe(value?: unknown): HistoryList {
    if (!Array.isArray(value)) return create([]);
    return create(toHistoryList(value));
  },

  equals(v1: HistoryList, v2: HistoryList): boolean {
    if (v1.length !== v2.length) return false;
    return v1.every((v, i) => History.equals(v, v2[i]));
  },

  /** 履歴を更新した新しいインスタンスを返す */
  update(input: HistoryList, history: History): HistoryList {
    return create(input.map((v) => (History.equals(v, history) ? history : v)));
  },

  /** bookIdに紐付く最後に閉じたページのインデックスを返す */
  getClosedPageIndex(input: HistoryList, bookId: BookId): number | undefined {
    return input.find((v) => BookId.equals(v.bookId, bookId))?.closedPageIndex;
  },

  /**
   * 新たな履歴をリストの先頭に追加する（最大100件）\
   * すでに存在する場合、リストの先頭に移動する
   */
  tryPrepend(input: HistoryList, bookId: BookId): HistoryList {
    const index = input.findIndex((v) => BookId.equals(v.bookId, bookId));
    if (index === -1) return prepend(input, bookId);
    if (index === 0) return input;
    return moveToHead(input, index);
  },
} as const;

const create = (value: readonly History[]): HistoryList => {
  return value as HistoryList;
};

const toHistoryList = (array: Record<string, unknown>[]): History[] => {
  return array.map((v) =>
    History.createSafe(BookId.createSafe(v.bookId), ClosedPageIndex.createSafe(v.closedPageIndex)),
  );
};

const prepend = (input: HistoryList, bookId: BookId): HistoryList => {
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
