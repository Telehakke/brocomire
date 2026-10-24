import { describe, expect, it } from "vite-plus/test";
import {
  createShouldShowSharpeningFilterButton,
  SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT,
} from "./shouldShowSharpeningFilterButton";

describe("createShouldShowSharpeningFilterButton", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldShowSharpeningFilterButton(true)).toBeTruthy();
    expect(createShouldShowSharpeningFilterButton(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldShowSharpeningFilterButton(null)).toBe(
      SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT,
    );
    expect(createShouldShowSharpeningFilterButton()).toBe(
      SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT,
    );
  });
});
