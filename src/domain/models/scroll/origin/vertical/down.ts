import { ScrollPct } from "../../scrollPct";
import type { Origin } from "../origin";
import { isOriginEnd } from "../shared/isOriginEnd";
import { isOriginStart } from "../shared/isOriginStart";
import { NextOrigin } from "../shared/nextOrigin";
import { previousOrigin } from "../shared/previousOrigin";
import { DownValue } from "./values";

export const Down: Origin = {
    ...DownValue,
    isInRange(value) {
        return ScrollPct.CENTER < value && value < ScrollPct.MAX;
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
