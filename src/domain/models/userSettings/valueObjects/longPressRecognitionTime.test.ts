import { describe, expect, it } from "vite-plus/test";
import {
  createLongPressRecognitionTime,
  LONG_PRESS_RECOGNITION_TIME_DEFAULT,
  LONG_PRESS_RECOGNITION_TIME_MAX,
  LONG_PRESS_RECOGNITION_TIME_MIN,
} from "./longPressRecognitionTime";

describe("createLongPressRecognitionTime", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createLongPressRecognitionTime(LONG_PRESS_RECOGNITION_TIME_MIN)).toBe(
      LONG_PRESS_RECOGNITION_TIME_MIN,
    );
    expect(createLongPressRecognitionTime(LONG_PRESS_RECOGNITION_TIME_MAX)).toBe(
      LONG_PRESS_RECOGNITION_TIME_MAX,
    );
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createLongPressRecognitionTime(LONG_PRESS_RECOGNITION_TIME_MIN - 1)).toBe(
      LONG_PRESS_RECOGNITION_TIME_MIN,
    );
    expect(createLongPressRecognitionTime(LONG_PRESS_RECOGNITION_TIME_MAX + 1)).toBe(
      LONG_PRESS_RECOGNITION_TIME_MAX,
    );
  });

  it("数値以外の入力に対しデフォルト値を返す", () => {
    expect(createLongPressRecognitionTime(null)).toBe(LONG_PRESS_RECOGNITION_TIME_DEFAULT);
    expect(createLongPressRecognitionTime()).toBe(LONG_PRESS_RECOGNITION_TIME_DEFAULT);
  });
});
