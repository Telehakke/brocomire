import type { BookFormatType } from "../../../userSettings/valueObjects/bookFormat";
import type { ScrollStepCountType } from "../../../userSettings/valueObjects/scrollStepCount";
import { Leftmost } from "../horizontal/leftmost";
import { Rightmost } from "../horizontal/rightmost";
import type { Origin, OriginNameType } from "../origin";
import { Bottom } from "../vertical/bottom";
import { Top } from "../vertical/top";
import { VCenter } from "../vertical/vCenter";

// 垂直方向の状態変化: Top -> VCenter -> Bottom -> Top...
// 水平方向の状態変化（縦書き）: Rightmost -> Leftmost -> Rightmost...
// 水平方向の状態変化（横書き）: Leftmost -> Rightmost -> Leftmost...

export const NextOrigin = (
    name: OriginNameType,
    bookFormat: BookFormatType,
    scrollStepCount: ScrollStepCountType,
): Origin => {
    const obj: Record<
        OriginNameType,
        Record<BookFormatType, Record<ScrollStepCountType, Origin>>
    > = {
        // 垂直方向
        Top: {
            vertical: { four: Bottom, six: VCenter },
            horizontal: { four: Bottom, six: VCenter },
        },
        Up: {
            vertical: { four: Bottom, six: VCenter },
            horizontal: { four: Bottom, six: VCenter },
        },
        VCenter: {
            vertical: { four: Bottom, six: Bottom },
            horizontal: { four: Bottom, six: Bottom },
        },
        Down: {
            vertical: { four: Bottom, six: Bottom },
            horizontal: { four: Bottom, six: Bottom },
        },
        Bottom: {
            vertical: { four: Top, six: Top },
            horizontal: { four: Top, six: Top },
        },
        // 水平方向
        Leftmost: {
            vertical: { four: Rightmost, six: Rightmost },
            horizontal: { four: Rightmost, six: Rightmost },
        },
        Left: {
            vertical: { four: Leftmost, six: Leftmost },
            horizontal: { four: Rightmost, six: Rightmost },
        },
        HCenter: {
            vertical: { four: Leftmost, six: Leftmost },
            horizontal: { four: Rightmost, six: Rightmost },
        },
        Right: {
            vertical: { four: Leftmost, six: Leftmost },
            horizontal: { four: Rightmost, six: Rightmost },
        },
        Rightmost: {
            vertical: { four: Leftmost, six: Leftmost },
            horizontal: { four: Leftmost, six: Leftmost },
        },
    } as const;
    return obj[name][bookFormat][scrollStepCount];
};
