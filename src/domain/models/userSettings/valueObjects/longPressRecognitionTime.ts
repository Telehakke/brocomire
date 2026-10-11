import { isNumber } from "../../utils/isNumber";

declare const LongPressRecognitionTimeBrand: unique symbol;

export type LongPressRecognitionTime = number & { [LongPressRecognitionTimeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const LongPressRecognitionTime = {
  MIN: 200,
  MAZ: 500,
  DEFAULT: 500,

  createSafe(value?: unknown): LongPressRecognitionTime {
    if (!isNumber(value)) return create(this.DEFAULT);
    return create(value);
  },

  equals(v1: LongPressRecognitionTime, v2: LongPressRecognitionTime): boolean {
    return v1 === v2;
  },
} as const;

const create = (value: number): LongPressRecognitionTime => {
  return value as LongPressRecognitionTime;
};
