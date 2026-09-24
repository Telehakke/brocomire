import { isNumber } from "../../utils/isNumber";
import { ValueObject } from "../../utils/valueObject";

export type SharpeningFilterStrengthJSON = number;

declare const SharpeningFilterStrengthBrand: unique symbol;

export class SharpeningFilterStrength extends ValueObject<SharpeningFilterStrengthJSON> {
    declare [SharpeningFilterStrengthBrand]: unknown;

    static readonly MIN = 1;
    static readonly MAX = 10;
    static readonly DEFAULT = 3;

    private constructor(value: number) {
        super(value);
    }

    static createSafe(value?: unknown): SharpeningFilterStrength {
        if (!isNumber(value)) return new SharpeningFilterStrength(this.DEFAULT);
        return new SharpeningFilterStrength(
            Math.max(Math.min(value, this.MAX), this.MIN),
        );
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
