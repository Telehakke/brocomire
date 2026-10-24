import {
  SCROLL_PERCENTAGE_CENTER,
  SCROLL_PERCENTAGE_MAX,
  SCROLL_PERCENTAGE_MIN,
} from "../../scrollPercentage";
import type { OriginValue } from "../origin";

// -----Top--------- 0
//      Up
// -----VCenter----- 50
//      Down
// -----Bottom------ 100

export const TopValue: OriginValue = {
  name: "Top",
  value: SCROLL_PERCENTAGE_MIN,
};

export const UpValue: OriginValue = {
  name: "Up",
  value: undefined,
};

export const VCenterValue: OriginValue = {
  name: "VCenter",
  value: SCROLL_PERCENTAGE_CENTER,
};

export const DownValue: OriginValue = {
  name: "Down",
  value: undefined,
};

export const BottomValue: OriginValue = {
  name: "Bottom",
  value: SCROLL_PERCENTAGE_MAX,
};
