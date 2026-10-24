import { describe, expect, it, test } from "vite-plus/test";
import { ImageViewerManager } from "../../../infrastructure/viewer/imageViewerManager";
import { BookFormatEnum, createBookFormat } from "../userSettings/valueObjects/bookFormat";
import {
  createScrollStepCount,
  ScrollStepCountEnum,
} from "../userSettings/valueObjects/scrollStepCount";
import type { ViewerBodyProperties, ViewerCanvasProperties } from "../viewer/viewerManager";
import { createScrollPercentage } from "./scrollPercentage";
import { ScrollPercentage2D } from "./scrollPercentage2D";

test("constructor", () => {
  const scrollPercentage2D = new ScrollPercentage2D();
  expect(scrollPercentage2D.x).toBe(0);
  expect(scrollPercentage2D.y).toBe(0);
});

describe("add", () => {
  it("入力値が加算される", () => {
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.add(1, 2);
    expect(scrollPercentage2D.x).toBe(1);
    expect(scrollPercentage2D.y).toBe(2);
  });

  it("xとyの上限は100", () => {
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.add(101, 0);
    expect(scrollPercentage2D.x).toBe(100);

    scrollPercentage2D.add(0, 101);
    expect(scrollPercentage2D.y).toBe(100);
  });

  it("xとyの下限は0", () => {
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.add(-1, 0);
    expect(scrollPercentage2D.x).toBe(0);

    scrollPercentage2D.add(0, -1);
    expect(scrollPercentage2D.y).toBe(0);
  });
});

describe("setFromViewerManager", () => {
  it("水平方向のスクロール量が反映される", () => {
    const body: ViewerBodyProperties = {
      clientWidth: 100,
      clientHeight: 100,
      scrollLeft: 100,
      scrollTop: 0,
      scroll: function (): void {},
    };
    const canvas: ViewerCanvasProperties = {
      clientWidth: 200,
      clientHeight: 200,
    };
    const viewerManager = new ImageViewerManager(
      () => body,
      () => canvas,
    );
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.setFromViewerManager(viewerManager);
    expect(scrollPercentage2D.x).toBe(100);
    expect(scrollPercentage2D.y).toBe(0);
  });

  it("垂直方向のスクロール量が反映される", () => {
    const body: ViewerBodyProperties = {
      clientWidth: 100,
      clientHeight: 100,
      scrollLeft: 0,
      scrollTop: 100,
      scroll: function (): void {},
    };
    const canvas: ViewerCanvasProperties = {
      clientWidth: 200,
      clientHeight: 200,
    };
    const viewerManager = new ImageViewerManager(
      () => body,
      () => canvas,
    );
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.setFromViewerManager(viewerManager);
    expect(scrollPercentage2D.x).toBe(0);
    expect(scrollPercentage2D.y).toBe(100);
  });
});

describe("setStartPosition", () => {
  it("bookFormat=verticalであれば右上の位置にセットされる", () => {
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.setStartPosition("vertical");
    expect(scrollPercentage2D.x).toBe(100);
    expect(scrollPercentage2D.y).toBe(0);
  });

  it("bookFormat=horizontalであれば左上の位置にセットされる", () => {
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.setStartPosition("horizontal");
    expect(scrollPercentage2D.x).toBe(0);
    expect(scrollPercentage2D.y).toBe(0);
  });
});

describe("setEndPosition", () => {
  it("bookFormat=verticalであれば左下の位置にセットされる", () => {
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.setEndPosition("vertical");
    expect(scrollPercentage2D.x).toBe(0);
    expect(scrollPercentage2D.y).toBe(100);
  });

  it("bookFormat=horizontalであれば右下の位置にセットされる", () => {
    const scrollPercentage2D = new ScrollPercentage2D();
    scrollPercentage2D.setEndPosition("horizontal");
    expect(scrollPercentage2D.x).toBe(100);
    expect(scrollPercentage2D.y).toBe(100);
  });
});

describe("setNextPosition", () => {
  const min = createScrollPercentage(0);
  const center = createScrollPercentage(50);
  const max = createScrollPercentage(100);
  const vertical = createBookFormat(BookFormatEnum.vertical);
  const horizontal = createBookFormat(BookFormatEnum.horizontal);
  const four = createScrollStepCount(ScrollStepCountEnum.four);
  const six = createScrollStepCount(ScrollStepCountEnum.six);

  it("縦書き、4ステップ、垂直方向スクロール可能であれば、右上 -> 右下", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, min);
    scrollPercentage2D.setNextPosition(vertical, four, true);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(max);
  });

  it("縦書き、4ステップ、垂直方向スクロール不可であれば、右上 -> 左上", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, min);
    scrollPercentage2D.setNextPosition(vertical, four, false);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(min);
  });

  it("縦書き、6ステップ、垂直方向スクロール可能であれば、右上 -> 右中", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, min);
    scrollPercentage2D.setNextPosition(vertical, six, true);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(center);
  });

  it("縦書き、6ステップ、垂直方向スクロール不可であれば、右上 -> 左上", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, min);
    scrollPercentage2D.setNextPosition(vertical, six, false);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(min);
  });

  it("横書き、4ステップ、垂直方向スクロール可能であれば、左上 -> 左下", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, min);
    scrollPercentage2D.setNextPosition(horizontal, four, true);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(max);
  });

  it("横書き、4ステップ、垂直方向スクロール不可であれば、左上 -> 右上", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, min);
    scrollPercentage2D.setNextPosition(horizontal, four, false);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(min);
  });

  it("横書き、6ステップ、垂直方向スクロール可能であれば、左上 -> 左中", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, min);
    scrollPercentage2D.setNextPosition(horizontal, six, true);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(center);
  });

  it("横書き、6ステップ、垂直方向スクロール不可であれば、左上 -> 右上", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, min);
    scrollPercentage2D.setNextPosition(horizontal, six, false);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(min);
  });
});

describe("setPreviousPosition", () => {
  const min = createScrollPercentage(0);
  const center = createScrollPercentage(50);
  const max = createScrollPercentage(100);
  const vertical = createBookFormat(BookFormatEnum.vertical);
  const horizontal = createBookFormat(BookFormatEnum.horizontal);
  const four = createScrollStepCount(ScrollStepCountEnum.four);
  const six = createScrollStepCount(ScrollStepCountEnum.six);

  it("縦書き、4ステップ、垂直方向スクロール可能であれば、右下 -> 右上", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, max);
    scrollPercentage2D.setPreviousPosition(vertical, four, true);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(min);
  });

  it("縦書き、4ステップ、垂直方向スクロール不可であれば、右下 -> 左下", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, max);
    scrollPercentage2D.setPreviousPosition(vertical, four, false);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(max);
  });

  it("縦書き、6ステップ、垂直方向スクロール可能であれば、右下 -> 右中", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, max);
    scrollPercentage2D.setPreviousPosition(vertical, six, true);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(center);
  });

  it("縦書き、6ステップ、垂直方向スクロール不可であれば、右下 -> 左下", () => {
    const scrollPercentage2D = new ScrollPercentage2D(max, max);
    scrollPercentage2D.setPreviousPosition(vertical, six, false);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(max);
  });

  it("横書き、4ステップ、垂直方向スクロール可能であれば、左下 -> 左上", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, max);
    scrollPercentage2D.setPreviousPosition(horizontal, four, true);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(min);
  });

  it("横書き、4ステップ、垂直方向スクロール不可であれば、左下 -> 右下", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, max);
    scrollPercentage2D.setPreviousPosition(horizontal, four, false);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(max);
  });

  it("横書き、6ステップ、垂直方向スクロール可能であれば、左下 -> 左中", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, max);
    scrollPercentage2D.setPreviousPosition(horizontal, six, true);
    expect(scrollPercentage2D.x).toBe(min);
    expect(scrollPercentage2D.y).toBe(center);
  });

  it("横書き、6ステップ、垂直方向スクロール不可であれば、左下 -> 右下", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, max);
    scrollPercentage2D.setPreviousPosition(horizontal, six, false);
    expect(scrollPercentage2D.x).toBe(max);
    expect(scrollPercentage2D.y).toBe(max);
  });
});

describe("canMoveToNextPage", () => {
  const min = createScrollPercentage(0);
  const center = createScrollPercentage(50);
  const max = createScrollPercentage(100);
  const vertical = createBookFormat(BookFormatEnum.vertical);
  const horizontal = createBookFormat(BookFormatEnum.horizontal);

  it("左右と上下にスクロール不可であればtrue", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, min);
    expect(scrollPercentage2D.canMoveToNextPage(vertical, false, false)).toBeTruthy();
    expect(scrollPercentage2D.canMoveToNextPage(horizontal, false, false)).toBeTruthy();
  });

  it("左右にスクロール不可、かつ垂直方向が終了位置であればtrue", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, max);
    expect(scrollPercentage2D.canMoveToNextPage(vertical, false, true)).toBeTruthy();
    expect(scrollPercentage2D.canMoveToNextPage(horizontal, false, true)).toBeTruthy();
  });

  it("上下にスクロール不可、かつ水平方向が終了位置であればtrue", () => {
    const v1 = new ScrollPercentage2D(min, min);
    expect(v1.canMoveToNextPage(vertical, true, false)).toBeTruthy();

    const v2 = new ScrollPercentage2D(max, min);
    expect(v2.canMoveToNextPage(horizontal, true, false)).toBeTruthy();
  });

  it("垂直方向と水平方向が終了位置であればtrue", () => {
    const v1 = new ScrollPercentage2D(min, max);
    expect(v1.canMoveToNextPage(vertical, true, true)).toBeTruthy();

    const v2 = new ScrollPercentage2D(max, max);
    expect(v2.canMoveToNextPage(horizontal, true, true)).toBeTruthy();
  });

  it("スクロール可能、かつ垂直方向と水平方向が終了位置でなければfalse", () => {
    const scrollPercentage2D = new ScrollPercentage2D(center, center);
    expect(scrollPercentage2D.canMoveToNextPage(vertical, true, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToNextPage(vertical, false, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToNextPage(vertical, true, false)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToNextPage(horizontal, true, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToNextPage(horizontal, false, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToNextPage(horizontal, true, false)).toBeFalsy();
  });
});

describe("canMoveToPreviousPage", () => {
  const min = createScrollPercentage(0);
  const center = createScrollPercentage(50);
  const max = createScrollPercentage(100);
  const vertical = createBookFormat(BookFormatEnum.vertical);
  const horizontal = createBookFormat(BookFormatEnum.horizontal);

  it("左右と上下にスクロール不可であればtrue", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, min);
    expect(scrollPercentage2D.canMoveToPreviousPage(vertical, false, false)).toBeTruthy();
    expect(scrollPercentage2D.canMoveToPreviousPage(horizontal, false, false)).toBeTruthy();
  });

  it("左右にスクロール不可、かつ垂直方向が開始位置であればtrue", () => {
    const scrollPercentage2D = new ScrollPercentage2D(min, min);
    expect(scrollPercentage2D.canMoveToPreviousPage(vertical, false, true)).toBeTruthy();
    expect(scrollPercentage2D.canMoveToPreviousPage(horizontal, false, true)).toBeTruthy();
  });

  it("上下にスクロール不可、かつ水平方向が開始位置であればtrue", () => {
    const v1 = new ScrollPercentage2D(max, min);
    expect(v1.canMoveToPreviousPage(vertical, true, false)).toBeTruthy();

    const v2 = new ScrollPercentage2D(min, min);
    expect(v2.canMoveToPreviousPage(horizontal, true, false)).toBeTruthy();
  });

  it("垂直方向と水平方向が開始位置であればtrue", () => {
    const v1 = new ScrollPercentage2D(max, min);
    expect(v1.canMoveToPreviousPage(vertical, true, true)).toBeTruthy();

    const v2 = new ScrollPercentage2D(min, min);
    expect(v2.canMoveToPreviousPage(horizontal, true, true)).toBeTruthy();
  });

  it("スクロール可能、かつ垂直方向と水平方向が終了位置でなければfalse", () => {
    const scrollPercentage2D = new ScrollPercentage2D(center, center);
    expect(scrollPercentage2D.canMoveToPreviousPage(vertical, true, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToPreviousPage(vertical, false, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToPreviousPage(vertical, true, false)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToPreviousPage(horizontal, true, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToPreviousPage(horizontal, false, true)).toBeFalsy();
    expect(scrollPercentage2D.canMoveToPreviousPage(horizontal, true, false)).toBeFalsy();
  });
});
