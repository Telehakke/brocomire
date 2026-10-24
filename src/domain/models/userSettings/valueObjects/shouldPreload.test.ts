import { describe, expect, it } from "vite-plus/test";
import { createShouldPreload, SHOULD_PRELOAD_DEFAULT } from "./shouldPreload";

describe("createShouldPreload", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldPreload(true)).toBeTruthy();
    expect(createShouldPreload(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldPreload(null)).toBe(SHOULD_PRELOAD_DEFAULT);
    expect(createShouldPreload()).toBe(SHOULD_PRELOAD_DEFAULT);
  });
});
