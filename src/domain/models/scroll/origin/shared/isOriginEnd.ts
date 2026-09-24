import type { BookFormatType } from "../../../userSettings/valueObjects/bookFormat";
import type { OriginNameType } from "../origin";

// 縦書きの終了原点: Bottom, Leftmost
// 横書きの終了原点: Bottom, Rightmost

export const isOriginEnd = (
    name: OriginNameType,
    bookFormat: BookFormatType,
): boolean => {
    const obj: Record<OriginNameType, Record<BookFormatType, boolean>> = {
        // 垂直方向
        Top: { vertical: false, horizontal: false },
        Up: { vertical: false, horizontal: false },
        VCenter: { vertical: false, horizontal: false },
        Down: { vertical: false, horizontal: false },
        Bottom: { vertical: true, horizontal: true },
        // 水平方向
        Leftmost: { vertical: true, horizontal: false },
        Left: { vertical: false, horizontal: false },
        HCenter: { vertical: false, horizontal: false },
        Right: { vertical: false, horizontal: false },
        Rightmost: { vertical: false, horizontal: true },
    } as const;
    return obj[name][bookFormat];
};
