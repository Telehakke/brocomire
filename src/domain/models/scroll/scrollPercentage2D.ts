import type { BookFormat, BookFormatType } from "../userSettings/valueObjects/bookFormat";
import { ScrollStepCount } from "../userSettings/valueObjects/scrollStepCount";
import { exhaustiveCheck } from "../utils/exhaustiveCheck";
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
import { ScrollPercentage } from "./scrollPercentage";

export class ScrollPercentage2D {
  private _x: ScrollPercentage;
  private _y: ScrollPercentage;

  constructor() {
    this._x = ScrollPercentage.createSafe(0);
    this._y = ScrollPercentage.createSafe(0);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  setX(value: number): void {
    this._x = ScrollPercentage.createSafe(value);
  }

  setY(value: number): void {
    this._y = ScrollPercentage.createSafe(value);
  }

  add(x: number, y: number): void {
    this._x = ScrollPercentage.createSafe(this._x + x);
    this._y = ScrollPercentage.createSafe(this._y + y);
  }

  /** 開始位置の座標をセットする */
  setStartPosition(bookFormat: BookFormatType): void {
    switch (bookFormat) {
      case "vertical":
        this._x = ScrollPercentage.createSafe(Rightmost.value);
        this._y = ScrollPercentage.createSafe(Top.value);
        break;
      case "horizontal":
        this._x = ScrollPercentage.createSafe(Leftmost.value);
        this._y = ScrollPercentage.createSafe(Top.value);
        break;
      default:
        exhaustiveCheck(bookFormat);
    }
  }

  /** 終了位置の座標をセットする */
  setEndPosition(bookFormat: BookFormatType): void {
    switch (bookFormat) {
      case "vertical":
        this._x = ScrollPercentage.createSafe(Leftmost.value);
        this._y = ScrollPercentage.createSafe(Bottom.value);
        break;
      case "horizontal":
        this._x = ScrollPercentage.createSafe(Rightmost.value);
        this._y = ScrollPercentage.createSafe(Bottom.value);
        break;
      default:
        exhaustiveCheck(bookFormat);
    }
  }

  /** 次のスクロール座標をセットする */
  setNextPosition(
    bookFormat: BookFormat,
    scrollStepCount: ScrollStepCount,
    canScrollY: boolean,
  ): void {
    if (canScrollY) {
      const { x, y } = this.getNextXY(bookFormat, scrollStepCount);
      if (x != null) this._x = ScrollPercentage.createSafe(x);
      if (y != null) this._y = ScrollPercentage.createSafe(y);
      return;
    }

    const { x, y } = this.getNextX(bookFormat, scrollStepCount);
    if (x != null) this._x = ScrollPercentage.createSafe(x);
    if (y != null) this._y = ScrollPercentage.createSafe(y);
  }

  /** 前のスクロール座標をセットする */
  setPreviousPosition(
    bookFormat: BookFormat,
    scrollStepCount: ScrollStepCount,
    canScrollY: boolean,
  ): void {
    if (canScrollY) {
      const { x, y } = this.getPreviousXY(bookFormat, scrollStepCount);
      if (x != null) this._x = ScrollPercentage.createSafe(x);
      if (y != null) this._y = ScrollPercentage.createSafe(y);
      return;
    }

    const { x, y } = this.getPreviousX(bookFormat, scrollStepCount);
    if (x != null) this._x = ScrollPercentage.createSafe(x);
    if (y != null) this._y = ScrollPercentage.createSafe(y);
  }

  /** 次のページに移動できるかどうか */
  canMoveToNextPage(bookFormat: BookFormat, canScrollX: boolean, canScrollY: boolean): boolean {
    return (
      // 左右にスクロール不可、または水平方向が終了原点であり、かつ
      // 上下にスクロール不可、または垂直方向が終了原点であればページ移動可能
      (!canScrollX || this.getHOrigin().isEnd(bookFormat)) &&
      (!canScrollY || this.getVOrigin().isEnd(bookFormat))
    );
  }

  /** 前のページに移動できるかどうか */
  canMoveToPreviousPage(bookFormat: BookFormat, canScrollX: boolean, canScrollY: boolean): boolean {
    return (
      // 左右にスクロール不可、または水平方向が開始原点であり、かつ
      // 上下にスクロール不可、または垂直方向が開始原点であればページ移動可能
      (!canScrollX || this.getHOrigin().isStart(bookFormat)) &&
      (!canScrollY || this.getVOrigin().isStart(bookFormat))
    );
  }

  private getNextXY = (
    bookFormat: BookFormat,
    scrollStepCount: ScrollStepCount,
  ): { x: number | undefined; y: number | undefined } => {
    const hOrigin = this.getHOrigin();
    const vOrigin = this.getVOrigin();
    return {
      x: vOrigin.isEnd(bookFormat) ? hOrigin.next(bookFormat, scrollStepCount).value : undefined,
      y: vOrigin.next(bookFormat, scrollStepCount).value,
    };
  };

  private getNextX = (
    bookFormat: BookFormat,
    scrollStepCount: ScrollStepCount,
  ): { x: number | undefined; y: number | undefined } => {
    const hOrigin = this.getHOrigin();
    return { x: hOrigin.next(bookFormat, scrollStepCount).value, y: undefined };
  };

  private getPreviousXY = (
    bookFormat: BookFormat,
    scrollStepCount: ScrollStepCount,
  ): { x: number | undefined; y: number | undefined } => {
    const hOrigin = this.getHOrigin();
    const vOrigin = this.getVOrigin();
    return {
      x: vOrigin.isStart(bookFormat)
        ? hOrigin.previous(bookFormat, scrollStepCount).value
        : undefined,
      y: vOrigin.previous(bookFormat, scrollStepCount).value,
    };
  };

  private getPreviousX = (
    bookFormat: BookFormat,
    scrollStepCount: ScrollStepCount,
  ): { x: number | undefined; y: number | undefined } => {
    const hOrigin = this.getHOrigin();
    return { x: hOrigin.previous(bookFormat, scrollStepCount).value, y: undefined };
  };

  private getHOrigin = (): Origin => {
    if (Leftmost.isInRange(this._x)) return Leftmost;
    if (Left.isInRange(this._x)) return Left;
    if (HCenter.isInRange(this._x)) return HCenter;
    if (Right.isInRange(this._x)) return Right;
    return Rightmost;
  };

  private getVOrigin = (): Origin => {
    if (Top.isInRange(this._y)) return Top;
    if (Up.isInRange(this._y)) return Up;
    if (VCenter.isInRange(this._y)) return VCenter;
    if (Down.isInRange(this._y)) return Down;
    return Bottom;
  };
}
