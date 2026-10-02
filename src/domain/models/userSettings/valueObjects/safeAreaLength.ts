import { isNumber } from "../../utils/isNumber";
import { ValueObject } from "../../utils/valueObject";

export type SafeAreaLengthJSON = number;

declare const SafeAreaLengthBrand: unique symbol;

export class SafeAreaLength extends ValueObject<SafeAreaLengthJSON> {
    declare [SafeAreaLengthBrand]: unknown;

    static readonly MIN = 0;
    static readonly MAX = 100;
    static readonly DEFAULT = 0;

    private constructor(value: number) {
        super(value);
    }

    static createSafe(value?: unknown): SafeAreaLength {
        if (!isNumber(value)) return new SafeAreaLength(this.DEFAULT);
        return new SafeAreaLength(
            Math.max(Math.min(value, this.MAX), this.MIN),
        );
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }

    isMin(): boolean {
        return this.value === SafeAreaLength.MIN;
    }
}
