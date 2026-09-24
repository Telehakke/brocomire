import { isBoolean } from "../../utils/isBoolean";
import { ValueObject } from "../../utils/valueObject";

export type ShouldShowFullscreenButtonJSON = boolean;

declare const ShouldShowFullscreenButtonBrand: unique symbol;

export class ShouldShowFullscreenButton extends ValueObject<ShouldShowFullscreenButtonJSON> {
    declare [ShouldShowFullscreenButtonBrand]: unknown;

    static readonly DEFAULT = false;

    constructor(value: boolean) {
        super(value);
    }

    static createSafe(value?: unknown): ShouldShowFullscreenButton {
        if (!isBoolean(value))
            return new ShouldShowFullscreenButton(this.DEFAULT);
        return new ShouldShowFullscreenButton(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
