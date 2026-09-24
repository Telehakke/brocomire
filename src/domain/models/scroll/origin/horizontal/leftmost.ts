import type { Origin } from "../origin";
import { isOriginEnd } from "../shared/isOriginEnd";
import { isOriginStart } from "../shared/isOriginStart";
import { NextOrigin } from "../shared/nextOrigin";
import { previousOrigin } from "../shared/previousOrigin";
import { LeftmostValue } from "./values";

export const Leftmost: Origin = {
    ...LeftmostValue,
    isInRange(value) {
        return value === this.value;
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
