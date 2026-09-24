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

export type OriginNameType = keyof typeof OriginNameEnum;

export type OriginValue = Readonly<{
    name: OriginNameType;
    value: number | undefined;
}>;

export type Origin = OriginValue &
    Readonly<{
        /** 渡された値が管理範囲内であるかどうか */
        isInRange(value: number): boolean;
        /** 開始原点であるかどうか */
        isStart(bookFormat: BookFormat): boolean;
        /** 終了原点であるかどうか */
        isEnd(bookFormat: BookFormat): boolean;
        /** 次にスクロールする原点を返す */
        next(bookFormat: BookFormat, scrollStepCount: ScrollStepCount): Origin;
        /** 前にスクロールする原点を返す */
        previous(
            bookFormat: BookFormat,
            scrollStepCount: ScrollStepCount,
        ): Origin;
    }>;
