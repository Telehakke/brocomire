import { describe, expect, it } from "vite-plus/test";
import {
  createSharpeningFilterStrength,
  SHARPENING_FILTER_STRENGTH_DEFAULT,
  SHARPENING_FILTER_STRENGTH_MAX,
  SHARPENING_FILTER_STRENGTH_MIN,
} from "./sharpeningFilterStrength";

describe("createSharpeningFilterStrength", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createSharpeningFilterStrength(SHARPENING_FILTER_STRENGTH_MIN)).toBe(
      SHARPENING_FILTER_STRENGTH_MIN,
    );
    expect(createSharpeningFilterStrength(SHARPENING_FILTER_STRENGTH_MAX)).toBe(
      SHARPENING_FILTER_STRENGTH_MAX,
    );
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createSharpeningFilterStrength(SHARPENING_FILTER_STRENGTH_MIN - 1)).toBe(
      SHARPENING_FILTER_STRENGTH_MIN,
    );
    expect(createSharpeningFilterStrength(SHARPENING_FILTER_STRENGTH_MAX + 1)).toBe(
      SHARPENING_FILTER_STRENGTH_MAX,
    );
  });

  it("数値以外の入力に対しデフォルト値を返す", () => {
    expect(createSharpeningFilterStrength(null)).toBe(SHARPENING_FILTER_STRENGTH_DEFAULT);
    expect(createSharpeningFilterStrength()).toBe(SHARPENING_FILTER_STRENGTH_DEFAULT);
  });
});
