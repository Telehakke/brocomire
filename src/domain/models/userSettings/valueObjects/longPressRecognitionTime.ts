import { isNumber } from "../../utils/isNumber";

declare const LongPressRecognitionTimeBrand: unique symbol;

export type LongPressRecognitionTime = number & { [LongPressRecognitionTimeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export const LONG_PRESS_RECOGNITION_TIME_MIN = 200;
export const LONG_PRESS_RECOGNITION_TIME_MAX = 500;
export const LONG_PRESS_RECOGNITION_TIME_DEFAULT = 500;

export const createLongPressRecognitionTime = (value?: unknown): LongPressRecognitionTime => {
  if (!isNumber(value)) return create(LONG_PRESS_RECOGNITION_TIME_DEFAULT);
  return create(
    Math.max(Math.min(value, LONG_PRESS_RECOGNITION_TIME_MAX), LONG_PRESS_RECOGNITION_TIME_MIN),
  );
};

/* -------------------------------------------------------------------------- */

const create = (value: number): LongPressRecognitionTime => {
  return value as LongPressRecognitionTime;
};
