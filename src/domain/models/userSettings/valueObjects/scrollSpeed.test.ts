import { describe, expect, it } from "vite-plus/test";
import {
  createScrollSpeed,
  SCROLL_SPEED_DEFAULT,
  SCROLL_SPEED_MAX,
  SCROLL_SPEED_MIN,
} from "./scrollSpeed";

describe("createScrollSpeed", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createScrollSpeed(SCROLL_SPEED_MIN)).toBe(SCROLL_SPEED_MIN);
    expect(createScrollSpeed(SCROLL_SPEED_MAX)).toBe(SCROLL_SPEED_MAX);
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createScrollSpeed(SCROLL_SPEED_MIN - 1)).toBe(SCROLL_SPEED_MIN);
    expect(createScrollSpeed(SCROLL_SPEED_MAX + 1)).toBe(SCROLL_SPEED_MAX);
  });

  it("数値以外の入力に対しデフォルト値を返す", () => {
    expect(createScrollSpeed(null)).toBe(SCROLL_SPEED_DEFAULT);
    expect(createScrollSpeed()).toBe(SCROLL_SPEED_DEFAULT);
  });
});
