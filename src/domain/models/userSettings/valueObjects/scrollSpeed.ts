import { isNumber } from "../../utils/isNumber";
import { ValueObject } from "../../utils/valueObject";

export type ScrollSpeedJSON = number;

declare const ScrollSpeedBrand: unique symbol;

export class ScrollSpeed extends ValueObject<ScrollSpeedJSON> {
    declare [ScrollSpeedBrand]: unknown;

    static readonly MIN = 1;
    static readonly MAX = 10;
    static readonly DEFAULT = 4;

    private constructor(value: number) {
        super(value);
    }

    static createSafe(value?: unknown): ScrollSpeed {
        if (!isNumber(value)) return new ScrollSpeed(this.DEFAULT);
        return new ScrollSpeed(Math.max(Math.min(value, this.MAX), this.MIN));
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
