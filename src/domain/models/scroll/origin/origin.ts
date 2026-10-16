import type { BookFormat } from "../../userSettings/valueObjects/bookFormat";
import type { ScrollStepCount } from "../../userSettings/valueObjects/scrollStepCount";

export const OriginNameEnum = {
  Top: "Top",
  Up: "Up",
  VCenter: "VCenter",
  Down: "Down",
  Bottom: "Bottom",
  Leftmost: "Leftmost",
  Left: "Left",
  HCenter: "HCenter",
  Right: "Right",
  Rightmost: "Rightmost",
} as const;

export type OriginNameType = (typeof OriginNameEnum)[keyof typeof OriginNameEnum];

export type OriginValue = Readonly<{
  name: OriginNameType;
  value: number | undefined;
}>;

export type Origin = OriginValue &
  Readonly<{
    /** 渡された値が管理範囲内であるかどうか */
    isInRange(value: number): boolean;

    /** 開始原点であるかどうか */
    isStartPosition(bookFormat: BookFormat): boolean;

    /** 終了原点であるかどうか */
    isEndPosition(bookFormat: BookFormat): boolean;

    /** 次にスクロールする原点を返す */
    getNextOrigin(bookFormat: BookFormat, scrollStepCount: ScrollStepCount): Origin;

    /** 前にスクロールする原点を返す */
    getPreviousOrigin(bookFormat: BookFormat, scrollStepCount: ScrollStepCount): Origin;
  }>;
