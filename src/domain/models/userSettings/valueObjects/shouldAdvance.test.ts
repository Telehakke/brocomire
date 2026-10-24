import { describe, expect, it } from "vite-plus/test";
import { createShouldAdvance, SHOULD_ADVANCE_DEFAULT } from "./shouldAdvance";

describe("createShouldAdvance", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldAdvance(true)).toBeTruthy();
    expect(createShouldAdvance(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldAdvance(null)).toBe(SHOULD_ADVANCE_DEFAULT);
    expect(createShouldAdvance()).toBe(SHOULD_ADVANCE_DEFAULT);
  });
});
