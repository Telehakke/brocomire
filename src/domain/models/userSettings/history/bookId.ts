import { isString } from "../../utils/isString";
import { ValueObject } from "../../utils/valueObject";

export type BookIdJSON = string;

declare const BookIdBrand: unique symbol;

export class BookId extends ValueObject<BookIdJSON> {
    declare [BookIdBrand]: unknown;

    constructor(value: string) {
        super(value);
    }

    static createSafe(value?: unknown): BookId {
        if (!isString(value)) return new this("");
        return new BookId(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
