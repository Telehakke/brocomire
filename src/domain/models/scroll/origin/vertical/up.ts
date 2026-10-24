import { SCROLL_PERCENTAGE_CENTER, SCROLL_PERCENTAGE_MIN } from "../../scrollPercentage";
import type { Origin } from "../origin";
import { isEnd } from "../shared/isEnd";
import { isStart } from "../shared/isStart";
import { nextOrigin } from "../shared/nextOrigin";
import { previousOrigin } from "../shared/previousOrigin";
import { UpValue } from "./values";

export const Up: Origin = {
  ...UpValue,

  isInRange(value) {
    return SCROLL_PERCENTAGE_MIN < value && value < SCROLL_PERCENTAGE_CENTER;
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
