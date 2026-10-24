import { createBookId, type BookId } from "./bookId";
import { createClosedPageIndex, type ClosedPageIndex } from "./closedPageIndex";

export type HistoryValue = Readonly<{
  bookId: BookId;
  closedPageIndex: ClosedPageIndex;
}>;

declare const HistoryBrand: unique symbol;

export type History = HistoryValue & { [HistoryBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createHistory = (bookId?: unknown, closedPageIndex?: unknown): History => {
  return {
    bookId: createBookId(bookId),
    closedPageIndex: createClosedPageIndex(closedPageIndex),
  } as History;
};

/** bookIdが一致するかどうかを返す */
export const equalsHistory = (v1: History, v2: History): boolean => {
  return v1.bookId === v2.bookId;
};
