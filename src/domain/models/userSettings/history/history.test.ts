import { describe, expect, it } from "vite-plus/test";
import { createHistory, equalsHistory } from "./history";

describe("createHistory", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createHistory("filename", 1)).toEqual({ bookId: "filename", closedPageIndex: 1 });
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createHistory(null, null)).toEqual({ bookId: "", closedPageIndex: 0 });
    expect(createHistory()).toEqual({ bookId: "", closedPageIndex: 0 });
    expect(createHistory("filename", null)).toEqual({ bookId: "filename", closedPageIndex: 0 });
    expect(createHistory(null, 1)).toEqual({ bookId: "", closedPageIndex: 1 });
  });
});

describe("equalsHistory", () => {
  it("bookIdが同じであればtrueを返す", () => {
    expect(equalsHistory(createHistory("filename", 0), createHistory("filename", 1))).toBeTruthy();
  });

  it("bookIdが異なればfalseを返す", () => {
    expect(equalsHistory(createHistory("filename1", 0), createHistory("filename2", 1))).toBeFalsy();
  });
});
