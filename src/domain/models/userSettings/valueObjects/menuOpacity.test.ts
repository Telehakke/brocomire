import { describe, expect, it } from "vite-plus/test";
import {
  createMenuOpacity,
  MENU_OPACITY_DEFAULT,
  MENU_OPACITY_MAX,
  MENU_OPACITY_MIN,
} from "./menuOpacity";

describe("createMenuOpacity", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createMenuOpacity(MENU_OPACITY_MIN)).toBe(MENU_OPACITY_MIN);
    expect(createMenuOpacity(MENU_OPACITY_MAX)).toBe(MENU_OPACITY_MAX);
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createMenuOpacity(MENU_OPACITY_MIN - 1)).toBe(MENU_OPACITY_MIN);
    expect(createMenuOpacity(MENU_OPACITY_MAX + 1)).toBe(MENU_OPACITY_MAX);
  });

  it("数値以外の入力に対しデフォルト値を返す", () => {
    expect(createMenuOpacity(null)).toBe(MENU_OPACITY_DEFAULT);
    expect(createMenuOpacity()).toBe(MENU_OPACITY_DEFAULT);
  });
});
