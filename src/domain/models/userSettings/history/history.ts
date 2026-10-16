import * as BookId from "./bookId";
import * as ClosedPageIndex from "./closedPageIndex";

export type HistoryValue = Readonly<{
  bookId: BookId.BookId;
  closedPageIndex: ClosedPageIndex.ClosedPageIndex;
}>;

declare const HistoryBrand: unique symbol;

export type History = HistoryValue & { [HistoryBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const createSafe = (bookId?: unknown, closedPageIndex?: unknown): History => {
  return {
    bookId: BookId.createSafe(bookId),
    closedPageIndex: ClosedPageIndex.createSafe(closedPageIndex),
  } as History;
};

export const equals = (v1: History, v2: History): boolean => {
  return BookId.equals(v1.bookId, v2.bookId);
};
