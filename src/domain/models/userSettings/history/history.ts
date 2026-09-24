import { Entity } from "../../utils/entry";
import { BookId } from "./bookId";
import { ClosedPageIndex } from "./closedPageIndex";

declare const HistoryBrand: unique symbol;

export class History extends Entity<BookId> {
    declare [HistoryBrand]: unknown;

    private readonly _closedPageIndex: ClosedPageIndex;

    private constructor(id: BookId, closedPageIndex: ClosedPageIndex) {
        super(id);
        this._closedPageIndex = closedPageIndex;
    }

    static create(id: string, closedPageIndex: number): History | null {
        const index = ClosedPageIndex.create(closedPageIndex);
        if (index == null) return null;

        return new History(new BookId(id), index);
    }

    static createSafe(id?: unknown, closedPageIndex?: unknown): History {
        return new History(
            BookId.createSafe(id),
            ClosedPageIndex.createSafe(closedPageIndex),
        );
    }

    get id(): string {
        return this._id.value;
    }

    get closedPageIndex(): number {
        return this._closedPageIndex.value;
    }

    equals(other: this): boolean {
        return this.id === other.id;
    }
}
