import { isBoolean } from "../../utils/isBoolean";
import { ValueObject } from "../../utils/valueObject";

export type ShouldAdvanceJSON = boolean;

declare const ShouldAdvanceBrand: unique symbol;

export class ShouldAdvance extends ValueObject<ShouldAdvanceJSON> {
    declare [ShouldAdvanceBrand]: unknown;

    static readonly DEFAULT = false;

    constructor(value: boolean) {
        super(value);
    }

    static createSafe(value?: unknown): ShouldAdvance {
        if (!isBoolean(value)) return new ShouldAdvance(this.DEFAULT);
        return new ShouldAdvance(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
