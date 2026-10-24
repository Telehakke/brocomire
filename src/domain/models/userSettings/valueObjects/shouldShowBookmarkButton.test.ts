import { describe, expect, it } from "vite-plus/test";
import {
  createShouldShowBookmarkButton,
  SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT,
} from "./shouldShowBookmarkButton";

describe("createShouldShowBookmarkButton", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldShowBookmarkButton(true)).toBeTruthy();
    expect(createShouldShowBookmarkButton(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldShowBookmarkButton(null)).toBe(SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT);
    expect(createShouldShowBookmarkButton()).toBe(SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT);
  });
});
