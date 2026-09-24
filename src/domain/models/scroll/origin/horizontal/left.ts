import { ScrollPct } from "../../scrollPct";
import type { Origin } from "../origin";
import { isOriginEnd } from "../shared/isOriginEnd";
import { isOriginStart } from "../shared/isOriginStart";
import { NextOrigin } from "../shared/nextOrigin";
import { previousOrigin } from "../shared/previousOrigin";
import { LeftValue } from "./values";

export const Left: Origin = {
    ...LeftValue,
    isInRange(value) {
        return ScrollPct.MIN < value && value < ScrollPct.CENTER;
    },
    isStart(bookFormat) {
        return isOriginStart(this.name, bookFormat.value);
    },
    isEnd(bookFormat) {
        return isOriginEnd(this.name, bookFormat.value);
    },
    next(bookFormat, scrollStepCount) {
        return NextOrigin(this.name, bookFormat.value, scrollStepCount.value);
    },
    previous(bookFormat, scrollStepCount) {
        return previousOrigin(
            this.name,
            bookFormat.value,
            scrollStepCount.value,
        );
    },
};
