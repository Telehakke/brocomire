import { describe, expect, it } from "vite-plus/test";
import { createZoomStep, ZOOM_STEP_DEFAULT, ZOOM_STEP_MAX, ZOOM_STEP_MIN } from "./zoomStep";

describe("createZoomStep", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createZoomStep(ZOOM_STEP_MIN)).toBe(ZOOM_STEP_MIN);
    expect(createZoomStep(ZOOM_STEP_MAX)).toBe(ZOOM_STEP_MAX);
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createZoomStep(ZOOM_STEP_MIN - 1)).toBe(ZOOM_STEP_MIN);
    expect(createZoomStep(ZOOM_STEP_MAX + 1)).toBe(ZOOM_STEP_MAX);
  });

  it("数値以外の入力に対しデフォルト値を返す", () => {
    expect(createZoomStep(null)).toBe(ZOOM_STEP_DEFAULT);
    expect(createZoomStep()).toBe(ZOOM_STEP_DEFAULT);
  });
});
