import type { Origin } from "../origin";
import { isOriginEnd } from "../shared/isOriginEnd";
import { isOriginStart } from "../shared/isOriginStart";
import { NextOrigin } from "../shared/nextOrigin";
import { previousOrigin } from "../shared/previousOrigin";
import { VCenterValue } from "./values";

export const VCenter: Origin = {
  ...VCenterValue,

  isInRange(value) {
    return value === this.value;
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
