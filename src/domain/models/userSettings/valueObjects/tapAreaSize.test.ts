import { describe, expect, it } from "vite-plus/test";
import {
  copyTapAreaSizeWith,
  createTapAreaSize,
  getSizeValues,
  SIZE_DEFAULT,
  SizeEnum,
} from "./tapAreaSize";

describe("createTapAreaSize", () => {
  it.each(getSizeValues())("正常値の入力に対し正常値を返す", (v) => {
    expect(createTapAreaSize(v, v)).toEqual({ width: v, height: v });
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createTapAreaSize(null)).toEqual({ width: SIZE_DEFAULT, height: SIZE_DEFAULT });
    expect(createTapAreaSize()).toEqual({ width: SIZE_DEFAULT, height: SIZE_DEFAULT });
    expect(createTapAreaSize(SizeEnum.none, null)).toEqual({
      width: SizeEnum.none,
      height: SIZE_DEFAULT,
    });
    expect(createTapAreaSize(null, SizeEnum.none)).toEqual({
      width: SIZE_DEFAULT,
      height: SizeEnum.none,
    });
  });
});

describe("copyTapAreaSizeWith", () => {
  it("inputの値がvalueの値で上書きされた新しい値を返す", () => {
    const input = createTapAreaSize(SizeEnum.none, SizeEnum.none);
    expect(copyTapAreaSizeWith(input, { width: SizeEnum.s })).toEqual({
      width: SizeEnum.s,
      height: SizeEnum.none,
    });
    expect(copyTapAreaSizeWith(input, { height: SizeEnum.s })).toEqual({
      width: SizeEnum.none,
      height: SizeEnum.s,
    });
  });
});

describe("getSizeValues", () => {
  it("Sizeが取りうる値を配列で返す", () => {
    expect(getSizeValues()).toEqual([SizeEnum.none, SizeEnum.s, SizeEnum.m, SizeEnum.l]);
  });
});
