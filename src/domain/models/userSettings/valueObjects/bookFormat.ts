import { Leftmost } from "../../scroll/origin/horizontal/leftmost";
import { Rightmost } from "../../scroll/origin/horizontal/rightmost";
import { Bottom } from "../../scroll/origin/vertical/bottom";
import { Top } from "../../scroll/origin/vertical/top";
import { ScrollPct } from "../../scroll/scrollPct";
import { ScrollPct2D } from "../../scroll/scrollPct2D";
import { ValueObject } from "../../utils/valueObject";

type BookFormatEnumValue = Readonly<{
    value: BookFormatType;
    label: string;
    startScrollPct2D: ScrollPct2D;
    endScrollPct2D: ScrollPct2D;
}>;

export const BookFormatEnum: Readonly<{
    vertical: BookFormatEnumValue;
    horizontal: BookFormatEnumValue;
}> = {
    vertical: {
        value: "vertical",
        label: "縦書き",
        startScrollPct2D: new ScrollPct2D({
            x: ScrollPct.createSafe(Rightmost.value),
            y: ScrollPct.createSafe(Top.value),
        }),
        endScrollPct2D: new ScrollPct2D({
            x: ScrollPct.createSafe(Leftmost.value),
            y: ScrollPct.createSafe(Bottom.value),
        }),
    },
    horizontal: {
        value: "horizontal",
        label: "横書き",
        startScrollPct2D: new ScrollPct2D({
            x: ScrollPct.createSafe(Leftmost.value),
            y: ScrollPct.createSafe(Top.value),
        }),
        endScrollPct2D: new ScrollPct2D({
            x: ScrollPct.createSafe(Rightmost.value),
            y: ScrollPct.createSafe(Bottom.value),
        }),
    },
};

export type BookFormatType = keyof typeof BookFormatEnum;

declare const BookFormatBrand: unique symbol;

export class BookFormat extends ValueObject<BookFormatType> {
    declare [BookFormatBrand]: unknown;

    static readonly DEFAULT: BookFormatType = "vertical";

    constructor(value: BookFormatType) {
        super(value);
    }

    static createSafe(value?: unknown): BookFormat {
        if (!this.isBookFormat(value)) return new BookFormat(this.DEFAULT);
        return new BookFormat(value);
    }

    private static isBookFormat(value: unknown): value is BookFormatType {
        return Object.keys(BookFormatEnum).some((v) => v === value);
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }
}
