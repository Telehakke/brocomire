import { ValueObject } from "../../../domain/models/utils/valueObject";

export const InfoVisibilityEnum = {
    visible: "visible",
    hidden: "hidden",
    none: "none",
} as const;

export type InfoVisibilityType = keyof typeof InfoVisibilityEnum;

declare const InfoVisibilityBrand: unique symbol;

export class InfoVisibility extends ValueObject<InfoVisibilityType> {
    declare [InfoVisibilityBrand]: unknown;

    constructor(value: InfoVisibilityType) {
        super(value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
