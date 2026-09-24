import { ScrollPct } from "../../scrollPct";
import type { OriginValue } from "../origin";

// |           |            |
// Leftmost HCenter Rightmost
// |           |            |
// |   Left    |   Right    |
// |           |            |
// 0           50         100

export const LeftmostValue: OriginValue = {
    name: "Leftmost",
    value: ScrollPct.MIN,
};

export const LeftValue: OriginValue = {
    name: "Left",
    value: undefined,
};

export const HCenterValue: OriginValue = {
    name: "HCenter",
    value: ScrollPct.CENTER,
};

export const RightValue: OriginValue = {
    name: "Right",
    value: undefined,
};

export const RightmostValue: OriginValue = {
    name: "Rightmost",
    value: ScrollPct.MAX,
};
