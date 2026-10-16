import type { Origin } from "../origin";
import { isEnd } from "../shared/isEnd";
import { isStart } from "../shared/isStart";
import { nextOrigin } from "../shared/nextOrigin";
import { previousOrigin } from "../shared/previousOrigin";
import { BottomValue } from "./values";

export const Bottom: Origin = {
  ...BottomValue,

  isInRange(value) {
    return value === this.value;
  },

  isStartPosition(bookFormat) {
    return isStart(this.name, bookFormat);
  },

  isEndPosition(bookFormat) {
    return isEnd(this.name, bookFormat);
  },

  getNextOrigin(bookFormat, scrollStepCount) {
    return nextOrigin(this.name, bookFormat, scrollStepCount);
  },

  getPreviousOrigin(bookFormat, scrollStepCount) {
    return previousOrigin(this.name, bookFormat, scrollStepCount);
  },
};
