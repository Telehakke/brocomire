import { describe, expect, it } from "vite-plus/test";
import {
  createSafeAreaLength,
  SAFE_AREA_LENGTH_DEFAULT,
  SAFE_AREA_LENGTH_MAX,
  SAFE_AREA_LENGTH_MIN,
} from "./safeAreaLength";

describe("createSafeAreaLength", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createSafeAreaLength(SAFE_AREA_LENGTH_MIN)).toBe(SAFE_AREA_LENGTH_MIN);
    expect(createSafeAreaLength(SAFE_AREA_LENGTH_MAX)).toBe(SAFE_AREA_LENGTH_MAX);
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createSafeAreaLength(SAFE_AREA_LENGTH_MIN - 1)).toBe(SAFE_AREA_LENGTH_MIN);
    expect(createSafeAreaLength(SAFE_AREA_LENGTH_MAX + 1)).toBe(SAFE_AREA_LENGTH_MAX);
  });

  it("数値以外の入力に対しデフォルト値を返す", () => {
    expect(createSafeAreaLength(null)).toBe(SAFE_AREA_LENGTH_DEFAULT);
    expect(createSafeAreaLength()).toBe(SAFE_AREA_LENGTH_DEFAULT);
  });
});
