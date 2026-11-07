import { describe, expect, it } from "vite-plus/test";
import { SHOULD_SHOW_INVERT_BUTTON_DEFAULT } from "./shouldShowInvertButton";
import {
  createShouldShowInvertMonochromeButton,
  SHOULD_SHOW_INVERT_MONOCHROME_BUTTON_DEFAULT,
} from "./shouldShowInvertMonochromeButton";

describe("createShouldShowInvertMonochromeButton", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldShowInvertMonochromeButton(true)).toBeTruthy();
    expect(createShouldShowInvertMonochromeButton(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldShowInvertMonochromeButton(null)).toBe(
      SHOULD_SHOW_INVERT_MONOCHROME_BUTTON_DEFAULT,
    );
    expect(createShouldShowInvertMonochromeButton()).toBe(SHOULD_SHOW_INVERT_BUTTON_DEFAULT);
  });
});
