import { isNumber } from "../../utils/isNumber";
import { ValueObject } from "../../utils/valueObject";

export type ZoomStepJSON = number;

declare const ZoomStepBrand: unique symbol;

export class ZoomStep extends ValueObject<ZoomStepJSON> {
    declare [ZoomStepBrand]: unknown;

    static readonly MIN = 10;
    static readonly MAX = 200;
    static readonly DEFAULT = 50;

    private constructor(value: number) {
        super(value);
    }

    static createSafe(value?: unknown): ZoomStep {
        if (!isNumber(value)) return new ZoomStep(this.DEFAULT);
        return new ZoomStep(Math.max(Math.min(value, this.MAX), this.MIN));
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
