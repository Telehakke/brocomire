import { isNumber } from "../../utils/isNumber";
import { ValueObject } from "../../utils/valueObject";

export type ClosedPageIndexJSON = number;

declare const ClosedPageIndexBrand: unique symbol;

export class ClosedPageIndex extends ValueObject<ClosedPageIndexJSON> {
    declare [ClosedPageIndexBrand]: unknown;

    static readonly MIN = 0;

    private constructor(value: number) {
        super(value);
    }

    static create(value: number): ClosedPageIndex | null {
        if (!this.validate(value)) return null;
        return new ClosedPageIndex(value);
    }

    static createSafe(value?: unknown): ClosedPageIndex {
        if (!isNumber(value)) return new ClosedPageIndex(this.MIN);
        return new ClosedPageIndex(Math.max(value, this.MIN));
    }

    private static validate(value: number): boolean {
        return value >= 0;
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
