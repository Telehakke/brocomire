import { describe, expect, it } from "vite-plus/test";
import {
  createShouldShowInvertLightnessButton,
  SHOULD_SHOW_INVERT_LIGHTNESS_BUTTON_DEFAULT,
} from "./shouldShowInvertLightnessButton";

describe("createShouldShowInvertLightnessButton", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldShowInvertLightnessButton(true)).toBeTruthy();
    expect(createShouldShowInvertLightnessButton(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldShowInvertLightnessButton(null)).toBe(
      SHOULD_SHOW_INVERT_LIGHTNESS_BUTTON_DEFAULT,
    );
    expect(createShouldShowInvertLightnessButton()).toBe(
      SHOULD_SHOW_INVERT_LIGHTNESS_BUTTON_DEFAULT,
    );
  });
});
