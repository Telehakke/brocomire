import { describe, expect, it } from "vite-plus/test";
import {
  createIsSmoothScrollEnabled,
  IS_SMOOTH_SCROLL_ENABLED_DEFAULT,
} from "./isSmoothScrollEnabled";

describe("createIsSmoothScrollEnabled", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createIsSmoothScrollEnabled(true)).toBeTruthy();
    expect(createIsSmoothScrollEnabled(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createIsSmoothScrollEnabled(null)).toBe(IS_SMOOTH_SCROLL_ENABLED_DEFAULT);
    expect(createIsSmoothScrollEnabled()).toBe(IS_SMOOTH_SCROLL_ENABLED_DEFAULT);
  });
});
