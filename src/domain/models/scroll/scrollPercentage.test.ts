import { describe, expect, it } from "vite-plus/test";
import {
  createScrollPercentage,
  SCROLL_PERCENTAGE_MAX,
  SCROLL_PERCENTAGE_MIN,
} from "./scrollPercentage";

describe("createScrollPercentage", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createScrollPercentage(SCROLL_PERCENTAGE_MIN)).toBe(SCROLL_PERCENTAGE_MIN);
    expect(createScrollPercentage(SCROLL_PERCENTAGE_MAX)).toBe(SCROLL_PERCENTAGE_MAX);
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createScrollPercentage(SCROLL_PERCENTAGE_MIN - 1)).toBe(SCROLL_PERCENTAGE_MIN);
    expect(createScrollPercentage(SCROLL_PERCENTAGE_MAX + 1)).toBe(SCROLL_PERCENTAGE_MAX);
  });
});
