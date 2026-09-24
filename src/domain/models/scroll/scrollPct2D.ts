import {
    BookFormatEnum,
    type BookFormat,
} from "../userSettings/valueObjects/bookFormat";
import type { ScrollStepCount } from "../userSettings/valueObjects/scrollStepCount";
import { ValueObject } from "../utils/valueObject";
import { HCenter } from "./origin/horizontal/hCenter";
import { Left } from "./origin/horizontal/left";
import { Leftmost } from "./origin/horizontal/leftmost";
import { Right } from "./origin/horizontal/right";
import { Rightmost } from "./origin/horizontal/rightmost";
import type { Origin } from "./origin/origin";
import { Bottom } from "./origin/vertical/bottom";
import { Down } from "./origin/vertical/down";
import { Top } from "./origin/vertical/top";
import { Up } from "./origin/vertical/up";
import { VCenter } from "./origin/vertical/vCenter";
import { ScrollPct } from "./scrollPct";

type ScrollPct2DValue = {
    x: ScrollPct;
    y: ScrollPct;
};

declare const ScrollPct2DBrand: unique symbol;

export class ScrollPct2D extends ValueObject<ScrollPct2DValue> {
    declare readonly [ScrollPct2DBrand]: unknown;

    constructor(value?: ScrollPct2DValue) {
        super(
            value ?? {
                x: ScrollPct.createSafe(),
                y: ScrollPct.createSafe(),
            },
        );
    }

    /** 本の書式と開始または終了位置をもとに座標を設定したインスタンスを作成 */
    static fromBookFormat(
        bookFormat: BookFormat,
        isStart: boolean,
    ): ScrollPct2D {
        if (isStart) return BookFormatEnum[bookFormat.value].startScrollPct2D;
        return BookFormatEnum[bookFormat.value].endScrollPct2D;
    }

    get x(): number {
        return this.value.x.value;
    }

    get y(): number {
        return this.value.y.value;
    }

    equals(other: this): boolean {
        return this.x === other.x && this.y === other.y;
    }

    /** 現在の座標に加算した新しいインスタンスを返す */
    add(x: number, y: number): ScrollPct2D {
        return new ScrollPct2D({
            x: ScrollPct.createSafe(this.x + x),
            y: ScrollPct.createSafe(this.y + y),
        });
    }

    /** 入力値で更新した新しいインスタンスを返す */
    update(x?: number, y?: number): ScrollPct2D {
        return new ScrollPct2D({
            x: ScrollPct.createSafe(x ?? this.x),
            y: ScrollPct.createSafe(y ?? this.y),
        });
    }

    /** 次にスクロールする座標の新しいインスタンスを返す */
    next(
        bookFormat: BookFormat,
        scrollStepCount: ScrollStepCount,
        canScrollY: boolean,
    ): ScrollPct2D {
        if (canScrollY)
            return new ScrollPct2D(this.nextXY(bookFormat, scrollStepCount));
        return new ScrollPct2D(this.nextX(bookFormat, scrollStepCount));
    }

    private nextXY(
        bookFormat: BookFormat,
        scrollStepCount: ScrollStepCount,
    ): ScrollPct2DValue {
        const hOrigin = this.getHOrigin();
        const vOrigin = this.getVOrigin();
        const x = vOrigin.isEnd(bookFormat)
            ? hOrigin.next(bookFormat, scrollStepCount).value
            : undefined;
        const y = vOrigin.next(bookFormat, scrollStepCount).value;
        return {
            x: new ScrollPct(x ?? this.x),
            y: new ScrollPct(y ?? this.y),
        };
    }

    private nextX(
        bookFormat: BookFormat,
        scrollStepCount: ScrollStepCount,
    ): ScrollPct2DValue {
        const hOrigin = this.getHOrigin();
        const x = hOrigin.next(bookFormat, scrollStepCount).value;
        return {
            x: new ScrollPct(x ?? this.x),
            y: new ScrollPct(this.y),
        };
    }

    /** 前にスクロールする座標の新しいインスタンスを返す */
    previous(
        bookFormat: BookFormat,
        scrollStepCount: ScrollStepCount,
        canScrollY: boolean,
    ): ScrollPct2D {
        if (canScrollY)
            return new ScrollPct2D(
                this.previousXY(bookFormat, scrollStepCount),
            );
        return new ScrollPct2D(this.previousX(bookFormat, scrollStepCount));
    }

    private previousXY(
        bookFormat: BookFormat,
        scrollStepCount: ScrollStepCount,
    ): ScrollPct2DValue {
        const hOrigin = this.getHOrigin();
        const vOrigin = this.getVOrigin();
        const x = vOrigin.isStart(bookFormat)
            ? hOrigin.previous(bookFormat, scrollStepCount).value
            : undefined;
        const y = vOrigin.previous(bookFormat, scrollStepCount).value;
        return {
            x: new ScrollPct(x ?? this.x),
            y: new ScrollPct(y ?? this.y),
        };
    }

    private previousX(
        bookFormat: BookFormat,
        scrollStepCount: ScrollStepCount,
    ): ScrollPct2DValue {
        const hOrigin = this.getHOrigin();
        const x = hOrigin.previous(bookFormat, scrollStepCount).value;
        return {
            x: new ScrollPct(x ?? this.x),
            y: new ScrollPct(this.y),
        };
    }

    /** 次のページへ移動できるかどうか */
    canMoveToNextPage(
        bookFormat: BookFormat,
        canScrollX: boolean,
        canScrollY: boolean,
    ): boolean {
        return (
            // 左右にスクロール不可、または水平方向が終了原点であり、かつ
            // 上下にスクロール不可、または垂直方向が終了原点であればページ移動可能
            (!canScrollX || this.getHOrigin().isEnd(bookFormat)) &&
            (!canScrollY || this.getVOrigin().isEnd(bookFormat))
        );
    }

    /** 前のページへ移動できるかどうか */
    canMoveToPreviousPage(
        bookFormat: BookFormat,
        canScrollX: boolean,
        canScrollY: boolean,
    ): boolean {
        return (
            // 左右にスクロール不可、または水平方向が開始原点であり、かつ
            // 上下にスクロール不可、または垂直方向が開始原点であればページ移動可能
            (!canScrollX || this.getHOrigin().isStart(bookFormat)) &&
            (!canScrollY || this.getVOrigin().isStart(bookFormat))
        );
    }

    private getHOrigin(): Origin {
        if (Leftmost.isInRange(this.x)) return Leftmost;
        if (Left.isInRange(this.x)) return Left;
        if (HCenter.isInRange(this.x)) return HCenter;
        if (Right.isInRange(this.x)) return Right;
        return Rightmost;
    }

    private getVOrigin(): Origin {
        if (Top.isInRange(this.y)) return Top;
        if (Up.isInRange(this.y)) return Up;
        if (VCenter.isInRange(this.y)) return VCenter;
        if (Down.isInRange(this.y)) return Down;
        return Bottom;
    }
}
