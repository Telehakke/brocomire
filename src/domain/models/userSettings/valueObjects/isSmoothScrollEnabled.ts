import { isBoolean } from "../../utils/isBoolean";
import { ValueObject } from "../../utils/valueObject";

export type IsSmoothScrollEnabledJSON = boolean;

declare const IsSmoothScrollEnabledBrand: unique symbol;

export class IsSmoothScrollEnabled extends ValueObject<IsSmoothScrollEnabledJSON> {
    declare [IsSmoothScrollEnabledBrand]: unknown;

    static readonly DEFAULT = false;

    constructor(value: boolean) {
        super(value);
    }

    static createSafe(value?: unknown): IsSmoothScrollEnabled {
        if (!isBoolean(value)) return new IsSmoothScrollEnabled(this.DEFAULT);
        return new IsSmoothScrollEnabled(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
