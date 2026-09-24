import { ValueObject } from "../../utils/valueObject";

type ContentFitEnumValue = Readonly<{ value: ContentFitType; label: string }>;

export const ContentFitEnum: Readonly<{
    all: ContentFitEnumValue;
    fill: ContentFitEnumValue;
}> = {
    all: { value: "all", label: "全体" },
    fill: { value: "fill", label: "満たす" },
};

export type ContentFitType = keyof typeof ContentFitEnum;

declare const ContentFitBrand: unique symbol;

export class ContentFit extends ValueObject<ContentFitType> {
    declare [ContentFitBrand]: unknown;

    static readonly DEFAULT: ContentFitType = "all";

    constructor(value: ContentFitType) {
        super(value);
    }

    static createSafe(value?: unknown): ContentFit {
        if (!this.isContentFit(value)) return new ContentFit(this.DEFAULT);
        return new ContentFit(value);
    }

    private static isContentFit(value: unknown): value is ContentFitType {
        return Object.keys(ContentFitEnum).some((v) => v === value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
