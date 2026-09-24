import { ScrollPct } from "../../scrollPct";
import type { OriginValue } from "../origin";

// -----Top--------- 0
//      Up
// -----VCenter----- 50
//      Down
// -----Bottom------ 100

export const TopValue: OriginValue = {
    name: "Top",
    value: ScrollPct.MIN,
};

export const UpValue: OriginValue = {
    name: "Up",
    value: undefined,
};

export const VCenterValue: OriginValue = {
    name: "VCenter",
    value: ScrollPct.CENTER,
};

export const DownValue: OriginValue = {
    name: "Down",
    value: undefined,
};

export const BottomValue: OriginValue = {
    name: "Bottom",
    value: ScrollPct.MAX,
};
