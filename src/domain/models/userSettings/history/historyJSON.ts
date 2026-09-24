import type { BookIdJSON } from "./bookId";
import type { ClosedPageIndexJSON } from "./closedPageIndex";

export type HistoryJSON = Readonly<{
    id: BookIdJSON;
    closedPageIndex: ClosedPageIndexJSON;
}>;
