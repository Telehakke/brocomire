import { isNumber } from "../../utils/isNumber";
import { ValueObject } from "../../utils/valueObject";

export type LongPressRecognitionTimeJSON = number;

declare const LongPressRecognitionTimeBrand: unique symbol;

export class LongPressRecognitionTime extends ValueObject<LongPressRecognitionTimeJSON> {
    declare [LongPressRecognitionTimeBrand]: unknown;

    static readonly MIN = 200;
    static readonly MAX = 500;
    static readonly DEFAULT = 500;

    private constructor(value: number) {
        super(value);
    }

    static createSafe(value?: unknown): LongPressRecognitionTime {
        if (!isNumber(value)) return new LongPressRecognitionTime(this.DEFAULT);
        return new LongPressRecognitionTime(
            Math.max(Math.min(value, this.MAX), this.MIN),
        );
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
