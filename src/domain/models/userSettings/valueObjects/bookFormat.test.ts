import { describe, expect, it } from "vite-plus/test";
import {
  BOOK_FORMAT_DEFAULT,
  BookFormatEnum,
  createBookFormat,
  getBookFormatValues,
} from "./bookFormat";

describe("createBookFormat", () => {
  it.each(getBookFormatValues())("正常値の入力に対し正常値を返す", (v) => {
    expect(createBookFormat(v)).toBe(v);
    expect(createBookFormat(v)).toBe(v);
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createBookFormat(null)).toBe(BOOK_FORMAT_DEFAULT);
    expect(createBookFormat()).toBe(BOOK_FORMAT_DEFAULT);
  });
});

describe("getBookFormatValues", () => {
  it("BookFormatが取りうる値を配列で返す", () => {
    expect(getBookFormatValues()).toEqual([BookFormatEnum.vertical, BookFormatEnum.horizontal]);
  });
});
