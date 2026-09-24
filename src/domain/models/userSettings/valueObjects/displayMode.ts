import { ValueObject } from "../../utils/valueObject";

type DisplayModeEnumValue = Readonly<{ value: DisplayModeType; label: string }>;

export const DisplayModeEnum: Readonly<{
    single: DisplayModeEnumValue;
    book: DisplayModeEnumValue;
    double: DisplayModeEnumValue;
}> = {
    single: { value: "single", label: "1" },
    book: { value: "book", label: "1・2" },
    double: { value: "double", label: "2" },
};

export type DisplayModeType = keyof typeof DisplayModeEnum;

declare const DisplayModeBrand: unique symbol;

export class DisplayMode extends ValueObject<DisplayModeType> {
    declare [DisplayModeBrand]: unknown;

    static readonly DEFAULT: DisplayModeType = "single";

    constructor(value: DisplayModeType) {
        super(value);
    }

    static createSafe(value?: unknown): DisplayMode {
        if (!this.isDisplayModeType(value))
            return new DisplayMode(this.DEFAULT);
        return new DisplayMode(value);
    }

    private static isDisplayModeType(value: unknown): value is DisplayModeType {
        return Object.keys(DisplayModeEnum).some((v) => v === value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
