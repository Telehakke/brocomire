import { isBoolean } from "../../utils/isBoolean";
import { ValueObject } from "../../utils/valueObject";

export type ShouldPreloadJSON = boolean;

declare const ShouldPreloadBrand: unique symbol;

export class ShouldPreload extends ValueObject<ShouldPreloadJSON> {
    declare [ShouldPreloadBrand]: unknown;

    static readonly DEFAULT = false;

    constructor(value: boolean) {
        super(value);
    }

    static createSafe(value?: unknown): ShouldPreload {
        if (!isBoolean(value)) return new ShouldPreload(this.DEFAULT);
        return new ShouldPreload(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
