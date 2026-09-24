import { isNotNull } from "../../utils/isNotNull";
import { ValueObject } from "../../utils/valueObject";

type TapAreaSizeEnumValue = Readonly<{
    value: TapAreaSizeType;
    label: string;
    length: string;
}>;

export const TapAreaSizeEnum: Readonly<{
    none: TapAreaSizeEnumValue;
    s: TapAreaSizeEnumValue;
    m: TapAreaSizeEnumValue;
    l: TapAreaSizeEnumValue;
}> = {
    none: { value: "none", label: "-", length: "0px" },
    s: { value: "s", label: "S", length: "75px" },
    m: { value: "m", label: "M", length: "100px" },
    l: { value: "l", label: "L", length: "125px" },
} as const;

export type TapAreaSizeType = keyof typeof TapAreaSizeEnum;

export type TapAreaSizeValue = Readonly<{
    width: TapAreaSizeType;
    height: TapAreaSizeType;
}>;

declare const TapAreaSizeBrand: unique symbol;

export class TapAreaSize extends ValueObject<TapAreaSizeValue> {
    declare [TapAreaSizeBrand]: unknown;

    static readonly DEFAULT: TapAreaSizeType = "s";

    constructor(value: TapAreaSizeValue) {
        super(value);
    }

    static createSafe(value?: unknown): TapAreaSize {
        if (
            !isNotNull(value) ||
            !this.isTapAreaSizeType(value.width) ||
            !this.isTapAreaSizeType(value.height)
        )
            return new TapAreaSize({
                width: this.DEFAULT,
                height: this.DEFAULT,
            });
        return new TapAreaSize({ width: value.width, height: value.height });
    }

    private static isTapAreaSizeType(value: unknown): value is TapAreaSizeType {
        return Object.keys(TapAreaSizeEnum).some((v) => v === value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }

    copyWith({ width, height }: Partial<TapAreaSizeValue>): TapAreaSize {
        return new TapAreaSize({
            width: width ?? this.value.width,
            height: height ?? this.value.height,
        });
    }
}
