import type {
    BookFormat,
    BookFormatType,
} from "../../domain/models/userSettings/valueObjects/bookFormat";
import type {
    DisplayMode,
    DisplayModeType,
} from "../../domain/models/userSettings/valueObjects/displayMode";

type Parity = "odd" | "even";

export class CurrentIndex {
    readonly value: number;
    readonly maxIndex: number;

    private constructor(value: number, maxIndex: number) {
        this.value = value;
        this.maxIndex = maxIndex;
    }

    static createSafe(value: number, maxIndex: number): CurrentIndex {
        const validMaxIndex = Math.max(maxIndex, 0);
        return new CurrentIndex(
            Math.max(Math.min(value, validMaxIndex), 0),
            validMaxIndex,
        );
    }

    setIndex(index: number): CurrentIndex {
        return new CurrentIndex(
            Math.max(Math.min(index, this.maxIndex), 0),
            this.maxIndex,
        );
    }

    decrementIndex(displayMode: DisplayMode): CurrentIndex {
        const amount = displayMode.value === "single" ? 1 : 2;
        return new CurrentIndex(
            Math.max(this.value - amount, 0),
            this.maxIndex,
        );
    }

    incrementIndex(displayMode: DisplayMode): CurrentIndex {
        const amount = displayMode.value === "single" ? 1 : 2;
        return new CurrentIndex(
            Math.min(this.value + amount, this.maxIndex),
            this.maxIndex,
        );
    }

    progress(fileSize: number): string | undefined {
        if (fileSize === 0) return undefined;
        return `${this.value + 1} / ${fileSize}`;
    }

    hasPreviousFile(): boolean {
        return this.value > 0;
    }

    hasNextFile(fileSize: number): boolean {
        return this.value < fileSize - 1;
    }

    getLeftIndex(
        bookFormat: BookFormat,
        displayMode: DisplayMode,
    ): number | undefined {
        const amount =
            this.leftIndexMap[displayMode.value][bookFormat.value][
                this.getParity(this.value)
            ];
        const index = this.value + amount;
        if (index < 0 || index > this.maxIndex) return undefined;
        return index;
    }

    getRightIndex(
        bookFormat: BookFormat,
        displayMode: DisplayMode,
    ): number | undefined {
        const amount =
            this.rightIndexMap[displayMode.value][bookFormat.value][
                this.getParity(this.value)
            ];
        if (amount == null) return undefined;
        const index = this.value + amount;
        if (index < 0 || index > this.maxIndex) return undefined;
        return index;
    }

    private getParity(value: number): Parity {
        return value % 2 === 1 ? "odd" : "even";
    }

    private leftIndexMap: Record<
        DisplayModeType,
        Record<BookFormatType, Record<Parity, number>>
    > = {
        single: {
            vertical: { odd: 0, even: 0 },
            horizontal: { odd: 0, even: 0 },
        },
        book: {
            vertical: { odd: 1, even: 0 },
            horizontal: { odd: 0, even: -1 },
        },
        double: {
            vertical: { odd: 0, even: 1 },
            horizontal: { odd: -1, even: 0 },
        },
    };

    private rightIndexMap: Record<
        DisplayModeType,
        Record<BookFormatType, Record<Parity, number | undefined>>
    > = {
        single: {
            vertical: { odd: undefined, even: undefined },
            horizontal: { odd: undefined, even: undefined },
        },
        book: {
            vertical: { odd: 0, even: -1 },
            horizontal: { odd: 1, even: 0 },
        },
        double: {
            vertical: { odd: -1, even: 0 },
            horizontal: { odd: 0, even: 1 },
        },
    };
}
