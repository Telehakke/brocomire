import { describe, expect, it } from "vite-plus/test";
import {
  CONTENT_FIT_DEFAULT,
  ContentFitEnum,
  createContentFit,
  getContentFitValues,
} from "./contentFit";

describe("createContentFit", () => {
  it.each(getContentFitValues())("正常値の入力に対し正常値を返す", (v) => {
    expect(createContentFit(v)).toBe(v);
    expect(createContentFit(v)).toBe(v);
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createContentFit(null)).toBe(CONTENT_FIT_DEFAULT);
    expect(createContentFit()).toBe(CONTENT_FIT_DEFAULT);
  });
});

describe("getContentFitValues", () => {
  it("ContentFitが取りうる値を配列で返す", () => {
    expect(getContentFitValues()).toEqual([ContentFitEnum.all, ContentFitEnum.fill]);
  });
});
