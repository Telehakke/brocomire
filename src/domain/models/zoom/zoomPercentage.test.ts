import { describe, expect, it } from "vite-plus/test";
import {
  addZoomPercentage,
  createZoomPercentage,
  subZoomPercentage,
  ZOOM_PERCENTAGE_MAX,
  ZOOM_PERCENTAGE_MIN,
} from "./zoomPercentage";

describe("createZoomPercentage", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(createZoomPercentage(ZOOM_PERCENTAGE_MIN)).toBe(ZOOM_PERCENTAGE_MIN);
    expect(createZoomPercentage(ZOOM_PERCENTAGE_MAX)).toBe(ZOOM_PERCENTAGE_MAX);
  });

  it("正常値の範囲から外れた入力に対し、範囲内に修正した値を返す", () => {
    expect(createZoomPercentage(ZOOM_PERCENTAGE_MIN - 1)).toBe(ZOOM_PERCENTAGE_MIN);
    expect(createZoomPercentage(ZOOM_PERCENTAGE_MAX + 1)).toBe(ZOOM_PERCENTAGE_MAX);
  });
});

describe("addZoomPercentage", () => {
  it("入力値が加算される", () => {
    const zoomPercentage = createZoomPercentage(ZOOM_PERCENTAGE_MIN);
    expect(addZoomPercentage(zoomPercentage, 1)).toBe(ZOOM_PERCENTAGE_MIN + 1);
  });

  it("最大値より加算されない", () => {
    const zoomPercentage = createZoomPercentage(ZOOM_PERCENTAGE_MAX);
    expect(addZoomPercentage(zoomPercentage, 1)).toBe(ZOOM_PERCENTAGE_MAX);
  });
});

describe("subZoomPercentage", () => {
  it("入力値が減算される", () => {
    const zoomPercentage = createZoomPercentage(ZOOM_PERCENTAGE_MAX);
    expect(subZoomPercentage(zoomPercentage, 1)).toBe(ZOOM_PERCENTAGE_MAX - 1);
  });

  it("最小値より減算されない", () => {
    const zoomPercentage = createZoomPercentage(ZOOM_PERCENTAGE_MIN);
    expect(subZoomPercentage(zoomPercentage, 1)).toBe(ZOOM_PERCENTAGE_MIN);
  });
});
