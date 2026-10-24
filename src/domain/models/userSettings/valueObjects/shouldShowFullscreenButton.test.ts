import { describe, expect, it } from "vite-plus/test";
import {
  createShouldShowFullscreenButton,
  SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT,
} from "./shouldShowFullscreenButton";

describe("createShouldShowFullscreenButton", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldShowFullscreenButton(true)).toBeTruthy();
    expect(createShouldShowFullscreenButton(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldShowFullscreenButton(null)).toBe(SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT);
    expect(createShouldShowFullscreenButton()).toBe(SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT);
  });
});
