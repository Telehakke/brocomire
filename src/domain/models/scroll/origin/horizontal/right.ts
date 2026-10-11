import { ScrollPercentage } from "../../scrollPercentage";
import type { Origin } from "../origin";
import { isOriginEnd } from "../shared/isOriginEnd";
import { isOriginStart } from "../shared/isOriginStart";
import { NextOrigin } from "../shared/nextOrigin";
import { previousOrigin } from "../shared/previousOrigin";
import { RightValue } from "./values";

export const Right: Origin = {
  ...RightValue,

  isInRange(value) {
    return ScrollPercentage.CENTER < value && value < ScrollPercentage.MAX;
  },

  isStart(bookFormat) {
    return isOriginStart(this.name, bookFormat);
  },

  isEnd(bookFormat) {
    return isOriginEnd(this.name, bookFormat);
  },

  next(bookFormat, scrollStepCount) {
    return NextOrigin(this.name, bookFormat, scrollStepCount);
  },

  previous(bookFormat, scrollStepCount) {
    return previousOrigin(this.name, bookFormat, scrollStepCount);
  },
};
