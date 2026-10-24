import { describe, expect, it } from "vite-plus/test";
import {
  createScrollStepCount,
  getScrollStepCountValues,
  SCROLL_STEP_COUNT_DEFAULT,
  ScrollStepCountEnum,
} from "./scrollStepCount";

describe("createScrollStepCount", () => {
  it.each(getScrollStepCountValues())("正常値の入力に対し正常値を返す", (v) => {
    expect(createScrollStepCount(v)).toBe(v);
    expect(createScrollStepCount(v)).toBe(v);
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createScrollStepCount(null)).toBe(SCROLL_STEP_COUNT_DEFAULT);
    expect(createScrollStepCount()).toBe(SCROLL_STEP_COUNT_DEFAULT);
  });
});

describe("getScrollStepCountValues", () => {
  it("ScrollStepCountが取りうる値を配列で返す", () => {
    expect(getScrollStepCountValues()).toEqual([ScrollStepCountEnum.four, ScrollStepCountEnum.six]);
  });
});
