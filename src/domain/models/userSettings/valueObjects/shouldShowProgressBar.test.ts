import { describe, expect, it } from "vite-plus/test";
import {
  createShouldShowProgressBar,
  SHOULD_SHOW_PROGRESS_BAR_DEFAULT,
} from "./shouldShowProgressBar";

describe("createShouldShowProgressBar", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createShouldShowProgressBar(true)).toBeTruthy();
    expect(createShouldShowProgressBar(false)).toBeFalsy();
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createShouldShowProgressBar(null)).toBe(SHOULD_SHOW_PROGRESS_BAR_DEFAULT);
    expect(createShouldShowProgressBar()).toBe(SHOULD_SHOW_PROGRESS_BAR_DEFAULT);
  });
});
