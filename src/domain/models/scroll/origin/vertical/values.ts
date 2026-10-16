import * as ScrollPercentage from "../../scrollPercentage";
import type { OriginValue } from "../origin";

// -----Top--------- 0
//      Up
// -----VCenter----- 50
//      Down
// -----Bottom------ 100

export const TopValue: OriginValue = {
  name: "Top",
  value: ScrollPercentage.MIN,
};

export const UpValue: OriginValue = {
  name: "Up",
  value: undefined,
};

export const VCenterValue: OriginValue = {
  name: "VCenter",
  value: ScrollPercentage.CENTER,
};

export const DownValue: OriginValue = {
  name: "Down",
  value: undefined,
};

export const BottomValue: OriginValue = {
  name: "Bottom",
  value: ScrollPercentage.MAX,
};
