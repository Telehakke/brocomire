import type { BookFormat, BookFormatValue } from "../userSettings/valueObjects/bookFormat";
import type { ScrollStepCount } from "../userSettings/valueObjects/scrollStepCount";
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
import * as ScrollPercentage from "./scrollPercentage";

type Position = { x: number | undefined; y: number | undefined };

export class ScrollPercentage2D {
  private _x: ScrollPercentage.ScrollPercentage;
  private _y: ScrollPercentage.ScrollPercentage;

  constructor() {
    this._x = ScrollPercentage.createMin();
    this._y = ScrollPercentage.createMin();
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
  setStartPosition(bookFormat: BookFormatValue): void {
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
  setEndPosition(bookFormat: BookFormatValue): void {
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
    let position: Position;
    if (canScrollY) {
      position = this.getNextXY(bookFormat, scrollStepCount);
    } else {
      position = this.getNextX(bookFormat, scrollStepCount);
    }
    if (position.x != null) this._x = ScrollPercentage.createSafe(position.x);
    if (position.y != null) this._y = ScrollPercentage.createSafe(position.y);
  }

  /** 前のスクロール座標をセットする */
  setPreviousPosition(
    bookFormat: BookFormat,
    scrollStepCount: ScrollStepCount,
    canScrollY: boolean,
  ): void {
    let position: Position;
    if (canScrollY) {
      position = this.getPreviousXY(bookFormat, scrollStepCount);
    } else {
      position = this.getPreviousX(bookFormat, scrollStepCount);
    }
    if (position.x != null) this._x = ScrollPercentage.createSafe(position.x);
    if (position.y != null) this._y = ScrollPercentage.createSafe(position.y);
  }

  /** 次のページに移動できるかどうか */
  canMoveToNextPage(bookFormat: BookFormat, canScrollX: boolean, canScrollY: boolean): boolean {
    return (
      // 左右にスクロール不可、または水平方向が終了原点であり、かつ
      // 上下にスクロール不可、または垂直方向が終了原点であればページ移動可能
      (!canScrollX || this.getHOrigin().isEndPosition(bookFormat)) &&
      (!canScrollY || this.getVOrigin().isEndPosition(bookFormat))
    );
  }

  /** 前のページに移動できるかどうか */
  canMoveToPreviousPage(bookFormat: BookFormat, canScrollX: boolean, canScrollY: boolean): boolean {
    return (
      // 左右にスクロール不可、または水平方向が開始原点であり、かつ
      // 上下にスクロール不可、または垂直方向が開始原点であればページ移動可能
      (!canScrollX || this.getHOrigin().isStartPosition(bookFormat)) &&
      (!canScrollY || this.getVOrigin().isStartPosition(bookFormat))
    );
  }

  private getNextXY = (bookFormat: BookFormat, scrollStepCount: ScrollStepCount): Position => {
    const hOrigin = this.getHOrigin();
    const vOrigin = this.getVOrigin();
    return {
      x: vOrigin.isEndPosition(bookFormat)
        ? hOrigin.getNextOrigin(bookFormat, scrollStepCount).value
        : undefined,
      y: vOrigin.getNextOrigin(bookFormat, scrollStepCount).value,
    };
  };

  private getNextX = (bookFormat: BookFormat, scrollStepCount: ScrollStepCount): Position => {
    return {
      x: this.getHOrigin().getNextOrigin(bookFormat, scrollStepCount).value,
      y: undefined,
    };
  };

  private getPreviousXY = (bookFormat: BookFormat, scrollStepCount: ScrollStepCount): Position => {
    const hOrigin = this.getHOrigin();
    const vOrigin = this.getVOrigin();
    return {
      x: vOrigin.isStartPosition(bookFormat)
        ? hOrigin.getPreviousOrigin(bookFormat, scrollStepCount).value
        : undefined,
      y: vOrigin.getPreviousOrigin(bookFormat, scrollStepCount).value,
    };
  };

  private getPreviousX = (bookFormat: BookFormat, scrollStepCount: ScrollStepCount): Position => {
    return {
      x: this.getHOrigin().getPreviousOrigin(bookFormat, scrollStepCount).value,
      y: undefined,
    };
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
