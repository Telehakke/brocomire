import { BookId } from "./bookId";
import { ClosedPageIndex } from "./closedPageIndex";

export type HistoryType = Readonly<{
  bookId: BookId;
  closedPageIndex: ClosedPageIndex;
}>;

declare const HistoryBrand: unique symbol;

export type History = HistoryType & { [HistoryBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const History = {
  createSafe(bookId?: unknown, closedPageIndex?: unknown): History {
    return create({
      bookId: BookId.createSafe(bookId),
      closedPageIndex: ClosedPageIndex.createSafe(closedPageIndex),
    });
  },

  equals(v1: History, v2: History): boolean {
    return v1.bookId === v2.bookId;
  },
} as const;

const create = (value: HistoryType): History => {
  return value as History;
};
