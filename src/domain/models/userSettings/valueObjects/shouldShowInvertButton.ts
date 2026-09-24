import { isBoolean } from "../../utils/isBoolean";
import { ValueObject } from "../../utils/valueObject";

export type ShouldShowInvertButtonJSON = boolean;

declare const ShouldShowInvertButtonBrand: unique symbol;

export class ShouldShowInvertButton extends ValueObject<ShouldShowInvertButtonJSON> {
    declare [ShouldShowInvertButtonBrand]: unknown;

    static readonly DEFAULT = false;

    constructor(value: boolean) {
        super(value);
    }

    static createSafe(value?: unknown): ShouldShowInvertButton {
        if (!isBoolean(value)) return new ShouldShowInvertButton(this.DEFAULT);
        return new ShouldShowInvertButton(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
