import type { BookFormatValue } from "../../../userSettings/valueObjects/bookFormat";
import type { ScrollStepCountValue } from "../../../userSettings/valueObjects/scrollStepCount";
import { exhaustiveCheck } from "../../../utils/exhaustiveCheck";
import { HCenter } from "../horizontal/hCenter";
import { Left } from "../horizontal/left";
import { Leftmost } from "../horizontal/leftmost";
import { Right } from "../horizontal/right";
import { Rightmost } from "../horizontal/rightmost";
import type { Origin, OriginNameType } from "../origin";
import { Bottom } from "../vertical/bottom";
import { Down } from "../vertical/down";
import { Top } from "../vertical/top";
import { Up } from "../vertical/up";
import { VCenter } from "../vertical/vCenter";

// 垂直方向の状態変化: Top -> VCenter -> Bottom -> Top...
// 水平方向の状態変化（縦書き）: Rightmost -> Leftmost -> Rightmost...
// 水平方向の状態変化（横書き）: Leftmost -> Rightmost -> Leftmost...

const map: Record<
  OriginNameType,
  Record<BookFormatValue, Record<ScrollStepCountValue, OriginNameType>>
> = {
  // 垂直方向
  Top: {
    vertical: { four: "Bottom", six: "VCenter" },
    horizontal: { four: "Bottom", six: "VCenter" },
  },
  Up: {
    vertical: { four: "Bottom", six: "VCenter" },
    horizontal: { four: "Bottom", six: "VCenter" },
  },
  VCenter: {
    vertical: { four: "Bottom", six: "Bottom" },
    horizontal: { four: "Bottom", six: "Bottom" },
  },
  Down: {
    vertical: { four: "Bottom", six: "Bottom" },
    horizontal: { four: "Bottom", six: "Bottom" },
  },
  Bottom: {
    vertical: { four: "Top", six: "Top" },
    horizontal: { four: "Top", six: "Top" },
  },
  // 水平方向
  Leftmost: {
    vertical: { four: "Rightmost", six: "Rightmost" },
    horizontal: { four: "Rightmost", six: "Rightmost" },
  },
  Left: {
    vertical: { four: "Leftmost", six: "Leftmost" },
    horizontal: { four: "Rightmost", six: "Rightmost" },
  },
  HCenter: {
    vertical: { four: "Leftmost", six: "Leftmost" },
    horizontal: { four: "Rightmost", six: "Rightmost" },
  },
  Right: {
    vertical: { four: "Leftmost", six: "Leftmost" },
    horizontal: { four: "Rightmost", six: "Rightmost" },
  },
  Rightmost: {
    vertical: { four: "Leftmost", six: "Leftmost" },
    horizontal: { four: "Leftmost", six: "Leftmost" },
  },
} as const;

export const nextOrigin = (
  originName: OriginNameType,
  bookFormat: BookFormatValue,
  scrollStepCount: ScrollStepCountValue,
): Origin => {
  const name = map[originName][bookFormat][scrollStepCount];
  switch (name) {
    case "Top":
      return Top;
    case "Up":
      return Up;
    case "VCenter":
      return VCenter;
    case "Down":
      return Down;
    case "Bottom":
      return Bottom;
    case "Leftmost":
      return Leftmost;
    case "Left":
      return Left;
    case "HCenter":
      return HCenter;
    case "Right":
      return Right;
    case "Rightmost":
      return Rightmost;
    default:
      exhaustiveCheck(name);
      throw new Error();
  }
};
