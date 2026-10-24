import type { BookFormatValue } from "../../../userSettings/valueObjects/bookFormat";
import type { OriginNameValue } from "../origin";

// 縦書きの終了原点: Bottom, Leftmost
// 横書きの終了原点: Bottom, Rightmost

const obj: Record<OriginNameValue, Record<BookFormatValue, boolean>> = {
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

export const isEnd = (originName: OriginNameValue, bookFormat: BookFormatValue): boolean => {
  return obj[originName][bookFormat];
};
