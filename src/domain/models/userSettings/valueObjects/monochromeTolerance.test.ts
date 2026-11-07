import { describe, expect, it } from "vite-plus/test";
import {
  createMonochromeTolerance,
  MONOCHROME_TOLERANCE_DEFAULT,
  MONOCHROME_TOLERANCE_MAX,
  MONOCHROME_TOLERANCE_MIN,
} from "./monochromeTolerance";

describe("createMonochromeTolerance", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createMonochromeTolerance(MONOCHROME_TOLERANCE_MIN)).toBe(MONOCHROME_TOLERANCE_MIN);
    expect(createMonochromeTolerance(MONOCHROME_TOLERANCE_MAX)).toBe(MONOCHROME_TOLERANCE_MAX);
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createMonochromeTolerance(MONOCHROME_TOLERANCE_MIN - 1)).toBe(MONOCHROME_TOLERANCE_MIN);
    expect(createMonochromeTolerance(MONOCHROME_TOLERANCE_MAX + 1)).toBe(MONOCHROME_TOLERANCE_MAX);
  });

  it("数値以外の入力に対しデフォルト値を返す", () => {
    expect(createMonochromeTolerance(null)).toBe(MONOCHROME_TOLERANCE_DEFAULT);
    expect(createMonochromeTolerance()).toBe(MONOCHROME_TOLERANCE_DEFAULT);
  });
});
