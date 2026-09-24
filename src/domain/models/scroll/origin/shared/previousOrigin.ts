import type { BookFormatType } from "../../../userSettings/valueObjects/bookFormat";
import type { ScrollStepCountType } from "../../../userSettings/valueObjects/scrollStepCount";
import { Leftmost } from "../horizontal/leftmost";
import { Rightmost } from "../horizontal/rightmost";
import type { Origin, OriginNameType } from "../origin";
import { Bottom } from "../vertical/bottom";
import { Top } from "../vertical/top";
import { VCenter } from "../vertical/vCenter";

// 垂直方向の状態変化: Bottom -> VCenter -> Top -> Bottom...
// 水平方向の状態変化（縦書き）: Leftmost -> Rightmost -> Leftmost...
// 水平方向の状態変化（横書き）: Rightmost -> Leftmost -> Rightmost...

export const previousOrigin = (
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
            vertical: { four: Bottom, six: Bottom },
            horizontal: { four: Bottom, six: Bottom },
        },
        Up: {
            vertical: { four: Top, six: Top },
            horizontal: { four: Top, six: Top },
        },
        VCenter: {
            vertical: { four: Top, six: Top },
            horizontal: { four: Top, six: Top },
        },
        Down: {
            vertical: { four: Top, six: VCenter },
            horizontal: { four: Top, six: VCenter },
        },
        Bottom: {
            vertical: { four: Top, six: VCenter },
            horizontal: { four: Top, six: VCenter },
        },
        // 水平方向
        Leftmost: {
            vertical: { four: Rightmost, six: Rightmost },
            horizontal: { four: Rightmost, six: Rightmost },
        },
        Left: {
            vertical: { four: Rightmost, six: Rightmost },
            horizontal: { four: Leftmost, six: Leftmost },
        },
        HCenter: {
            vertical: { four: Rightmost, six: Rightmost },
            horizontal: { four: Leftmost, six: Leftmost },
        },
        Right: {
            vertical: { four: Rightmost, six: Rightmost },
            horizontal: { four: Leftmost, six: Leftmost },
        },
        Rightmost: {
            vertical: { four: Leftmost, six: Leftmost },
            horizontal: { four: Leftmost, six: Leftmost },
        },
    } as const;
    return obj[name][bookFormat][scrollStepCount];
};
