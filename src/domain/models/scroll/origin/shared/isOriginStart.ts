import type { BookFormatType } from "../../../userSettings/valueObjects/bookFormat";
import type { OriginNameType } from "../origin";

// 縦書きの開始原点: Top, Rightmost
// 横書きの開始原点: Top, Leftmost

export const isOriginStart = (
    name: OriginNameType,
    bookFormat: BookFormatType,
): boolean => {
    const obj: Record<OriginNameType, Record<BookFormatType, boolean>> = {
        // 垂直方向
        Top: { vertical: true, horizontal: true },
        Up: { vertical: false, horizontal: false },
        VCenter: { vertical: false, horizontal: false },
        Down: { vertical: false, horizontal: false },
        Bottom: { vertical: false, horizontal: false },
        // 水平方向
        Leftmost: { vertical: false, horizontal: true },
        Left: { vertical: false, horizontal: false },
        HCenter: { vertical: false, horizontal: false },
        Right: { vertical: false, horizontal: false },
        Rightmost: { vertical: true, horizontal: false },
    } as const;
    return obj[name][bookFormat];
};
