import { ValueObject } from "../../utils/valueObject";

type ScrollStepCountEnumValue = Readonly<{
    value: ScrollStepCountType;
    label: string;
}>;

export const ScrollStepCountEnum: Readonly<{
    four: ScrollStepCountEnumValue;
    six: ScrollStepCountEnumValue;
}> = {
    four: { value: "four", label: "4" },
    six: { value: "six", label: "6" },
};

export type ScrollStepCountType = keyof typeof ScrollStepCountEnum;

declare const ScrollStepCountBrand: unique symbol;

export class ScrollStepCount extends ValueObject<ScrollStepCountType> {
    declare [ScrollStepCountBrand]: unknown;

    static readonly DEFAULT: ScrollStepCountType = "four";

    constructor(value: ScrollStepCountType) {
        super(value);
    }

    static createSafe(value?: unknown): ScrollStepCount {
        if (!this.isScrollStepCountType(value))
            return new ScrollStepCount(this.DEFAULT);
        return new ScrollStepCount(value);
    }

    private static isScrollStepCountType(
        value: unknown,
    ): value is ScrollStepCountType {
        return Object.keys(ScrollStepCountEnum).some((v) => v === value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
