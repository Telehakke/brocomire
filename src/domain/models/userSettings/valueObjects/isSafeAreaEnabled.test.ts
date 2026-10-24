import { describe, expect, it } from "vite-plus/test";
import { createIsSafeAreaEnabled, IS_SAFE_AREA_ENABLED_DEFAULT } from "./isSafeAreaEnabled";

describe("createIsSafeAreaEnabled", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createIsSafeAreaEnabled(true)).toBeTruthy();
    expect(createIsSafeAreaEnabled(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createIsSafeAreaEnabled(null)).toBe(IS_SAFE_AREA_ENABLED_DEFAULT);
    expect(createIsSafeAreaEnabled()).toBe(IS_SAFE_AREA_ENABLED_DEFAULT);
  });
});
