import { ScrollPercentage } from "../../scrollPercentage";
import type { OriginValue } from "../origin";

// |           |            |
// Leftmost HCenter Rightmost
// |           |            |
// |   Left    |   Right    |
// |           |            |
// 0           50         100

export const LeftmostValue: OriginValue = {
  name: "Leftmost",
  value: ScrollPercentage.MIN,
};

export const LeftValue: OriginValue = {
  name: "Left",
  value: undefined,
};

export const HCenterValue: OriginValue = {
  name: "HCenter",
  value: ScrollPercentage.CENTER,
};

export const RightValue: OriginValue = {
  name: "Right",
  value: undefined,
};

export const RightmostValue: OriginValue = {
  name: "Rightmost",
  value: ScrollPercentage.MAX,
};
