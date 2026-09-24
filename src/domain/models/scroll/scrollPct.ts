import { ValueObject } from "../utils/valueObject";

declare const ScrollPctBrand: unique symbol;

export class ScrollPct extends ValueObject<number> {
    declare [ScrollPctBrand]: unknown;

    static readonly MIN = 0;
    static readonly CENTER = 50;
    static readonly MAX = 100;

    constructor(value: number) {
        super(value);
    }

    static createSafe(value?: number): ScrollPct {
        if (value == null) return new ScrollPct(this.MIN);
        return new ScrollPct(Math.max(Math.min(value, this.MAX), this.MIN));
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
