import { ValueObject } from "../../../domain/models/utils/valueObject";

export const ChevronMarkEnum = {
    none: "none",
    left: "left",
    right: "right",
} as const;

export type ChevronMarkType = keyof typeof ChevronMarkEnum;

declare const ChevronMarkBrand: unique symbol;

export class ChevronMark extends ValueObject<ChevronMarkType> {
    declare [ChevronMarkBrand]: unknown;

    constructor(value: ChevronMarkType) {
        super(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
