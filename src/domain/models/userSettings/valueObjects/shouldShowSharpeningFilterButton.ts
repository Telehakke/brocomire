import { isBoolean } from "../../utils/isBoolean";
import { ValueObject } from "../../utils/valueObject";

export type ShouldShowSharpeningFilterButtonJSON = boolean;

declare const ShouldShowSharpeningFilterButtonBrand: unique symbol;

export class ShouldShowSharpeningFilterButton extends ValueObject<ShouldShowSharpeningFilterButtonJSON> {
    declare [ShouldShowSharpeningFilterButtonBrand]: unknown;

    static readonly DEFAULT = false;

    constructor(value: boolean) {
        super(value);
    }

    static createSafe(value?: unknown): ShouldShowSharpeningFilterButton {
        if (!isBoolean(value))
            return new ShouldShowSharpeningFilterButton(this.DEFAULT);
        return new ShouldShowSharpeningFilterButton(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
