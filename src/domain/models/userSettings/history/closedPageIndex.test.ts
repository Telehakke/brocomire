import { describe, expect, it } from "vite-plus/test";
import { createClosedPageIndex } from "./closedPageIndex";

describe("createClosedPageIndex", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createClosedPageIndex(1)).toBe(1);
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createClosedPageIndex(null)).toBe(0);
    expect(createClosedPageIndex()).toBe(0);
  });
});
