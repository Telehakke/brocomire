import { ValueObject } from "../utils/valueObject";

declare const ZoomLevelBrand: unique symbol;

export class ZoomPct extends ValueObject<number> {
    declare [ZoomLevelBrand]: unknown;

    static readonly MIN = 100;
    static readonly MAX = 1000;

    private constructor(value: number) {
        super(value);
    }

    static createSafe(value?: number): ZoomPct {
        if (value == null) return new ZoomPct(this.MIN);
        return new ZoomPct(Math.max(Math.min(value, this.MAX), this.MIN));
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }

    /** ズーム率を減らした新しいインスタンスを返す */
    zoomOut(amount: number): ZoomPct {
        return ZoomPct.createSafe(this.value - amount);
    }

    /** ズーム率を増やした新しいインスタンスを返す */
    zoomIn(amount: number): ZoomPct {
        return ZoomPct.createSafe(this.value + amount);
    }
}
