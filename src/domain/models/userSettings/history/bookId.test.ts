import { describe, expect, it } from "vite-plus/test";
import { createBookId } from "./bookId";

describe("createBookId", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createBookId("filename")).toBe("filename");
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createBookId(null)).toBe("");
    expect(createBookId()).toBe("");
  });
});
