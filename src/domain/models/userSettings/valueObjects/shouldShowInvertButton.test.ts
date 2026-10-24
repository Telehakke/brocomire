import { describe, expect, it } from "vite-plus/test";
import {
  createShouldShowInvertButton,
  SHOULD_SHOW_INVERT_BUTTON_DEFAULT,
} from "./shouldShowInvertButton";

describe("createShouldShowInvertButton", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldShowInvertButton(true)).toBeTruthy();
    expect(createShouldShowInvertButton(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldShowInvertButton(null)).toBe(SHOULD_SHOW_INVERT_BUTTON_DEFAULT);
    expect(createShouldShowInvertButton()).toBe(SHOULD_SHOW_INVERT_BUTTON_DEFAULT);
  });
});
