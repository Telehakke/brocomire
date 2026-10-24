import { describe, expect, it } from "vite-plus/test";
import {
  createDisplayMode,
  DISPLAY_MODE_DEFAULT,
  DisplayModeEnum,
  getDisplayModeValues,
} from "./displayMode";

describe("createDisplayMode", () => {
  it.each(getDisplayModeValues())("正常値の入力に対し正常値を返す", (v) => {
    expect(createDisplayMode(v)).toBe(v);
    expect(createDisplayMode(v)).toBe(v);
    expect(createDisplayMode(v)).toBe(v);
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createDisplayMode(null)).toBe(DISPLAY_MODE_DEFAULT);
    expect(createDisplayMode()).toBe(DISPLAY_MODE_DEFAULT);
  });
});

describe("getDisplayModeValues", () => {
  it("DisplayModeが取りうる値を配列で返す", () => {
    expect(getDisplayModeValues()).toEqual([
      DisplayModeEnum.single,
      DisplayModeEnum.book,
      DisplayModeEnum.double,
    ]);
  });
});
