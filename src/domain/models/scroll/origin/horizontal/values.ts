import {
  SCROLL_PERCENTAGE_CENTER,
  SCROLL_PERCENTAGE_MAX,
  SCROLL_PERCENTAGE_MIN,
} from "../../scrollPercentage";
import type { OriginValue } from "../origin";

// |           |            |
// Leftmost HCenter Rightmost
// |           |            |
// |   Left    |   Right    |
// |           |            |
// 0           50         100

export const LeftmostValue: OriginValue = {
  name: "Leftmost",
  value: SCROLL_PERCENTAGE_MIN,
};

export const LeftValue: OriginValue = {
  name: "Left",
  value: undefined,
};

export const HCenterValue: OriginValue = {
  name: "HCenter",
  value: SCROLL_PERCENTAGE_CENTER,
};

export const RightValue: OriginValue = {
  name: "Right",
  value: undefined,
};

export const RightmostValue: OriginValue = {
  name: "Rightmost",
  value: SCROLL_PERCENTAGE_MAX,
};
