import { isNumber } from "../../utils/isNumber";

declare const LongPressRecognitionTimeBrand: unique symbol;

export type LongPressRecognitionTime = number & { [LongPressRecognitionTimeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const MIN = 200;
export const MAX = 500;
export const DEFAULT = 500;

export const createSafe = (value?: unknown): LongPressRecognitionTime => {
  if (!isNumber(value)) return create(DEFAULT);
  return create(Math.max(Math.min(value, MAX), MIN));
};

export const equals = (v1: LongPressRecognitionTime, v2: LongPressRecognitionTime): boolean => {
  return v1 === v2;
};

const create = (value: number): LongPressRecognitionTime => {
  return value as LongPressRecognitionTime;
};
