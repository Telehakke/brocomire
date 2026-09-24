import { isBoolean } from "../../utils/isBoolean";
import { ValueObject } from "../../utils/valueObject";

export type IsSafeAreaEnabledJSON = boolean;

declare const IsSafeAreaEnabledBrand: unique symbol;

export class IsSafeAreaEnabled extends ValueObject<IsSafeAreaEnabledJSON> {
    declare [IsSafeAreaEnabledBrand]: unknown;

    static readonly DEFAULT = true;

    constructor(value: boolean) {
        super(value);
    }

    static createSafe(value?: unknown): IsSafeAreaEnabled {
        if (!isBoolean(value)) return new IsSafeAreaEnabled(this.DEFAULT);
        return new IsSafeAreaEnabled(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
