import { describe, expect, it, test } from "vite-plus/test";
import { BookFormatEnum, createBookFormat } from "../userSettings/valueObjects/bookFormat";
import { createDisplayMode, DisplayModeEnum } from "../userSettings/valueObjects/displayMode";
import {
  copyFileNavigatorWithCurrentIndex,
  createFileNavigator,
  decrementCurrentIndex,
  getFileNavigatorProgress,
  getLeftImageIndex,
  getRightImageIndex,
  hasNextFile,
  hasPreviousFile,
  incrementCurrentIndex,
} from "./fileNavigator";

test("copyFileNavigatorWithCurrentIndex", () => {
  expect(copyFileNavigatorWithCurrentIndex(createFileNavigator(0, 10), 1)).toEqual(
    createFileNavigator(1, 10),
  );
});

test("getFileNavigatorProgress", () => {
  expect(getFileNavigatorProgress(createFileNavigator(0, 10))).toBe("1 / 10");
});

describe("hasPreviousFile", () => {
  it("currentIndexが0より大きければtrueを返す", () => {
    expect(hasPreviousFile(createFileNavigator(1, 10))).toBeTruthy();
  });

  it("currentIndexが0以下であればfalseを返す", () => {
    expect(hasPreviousFile(createFileNavigator(0, 10))).toBeFalsy();
  });
});

describe("hasNextFile", () => {
  it("currentIndexがfileLength-1より小さければtrueを返す", () => {
    expect(hasNextFile(createFileNavigator(8, 10))).toBeTruthy();
  });

  it("currentIndexがfileLength-1以上であればfalseを返す", () => {
    expect(hasNextFile(createFileNavigator(9, 10))).toBeFalsy();
  });
});

describe("decrementCurrentIndex", () => {
  it("displayMode=singleであればcurrentIndexは1減る", () => {
    expect(
      decrementCurrentIndex(createFileNavigator(9, 10), createDisplayMode(DisplayModeEnum.single)),
    ).toEqual(createFileNavigator(8, 10));
  });

  it.each([DisplayModeEnum.book, DisplayModeEnum.double])(
    "displayMode=signal以外であればcurrentIndexは2減る",
    (v) => {
      expect(decrementCurrentIndex(createFileNavigator(9, 10), createDisplayMode(v))).toEqual(
        createFileNavigator(7, 10),
      );
    },
  );
});

describe("incrementCurrentIndex", () => {
  it("displayMode=signalであればcurrentIndexは1増える", () => {
    expect(
      incrementCurrentIndex(createFileNavigator(0, 10), createDisplayMode(DisplayModeEnum.single)),
    ).toEqual(createFileNavigator(1, 10));
  });

  it.each([DisplayModeEnum.book, DisplayModeEnum.double])(
    "displayMode=signal以外であればcurrentIndexは2増える",
    (v) => {
      expect(incrementCurrentIndex(createFileNavigator(0, 10), createDisplayMode(v))).toEqual(
        createFileNavigator(2, 10),
      );
    },
  );
});

describe("getLeftImageIndex", () => {
  const vertical = createBookFormat(BookFormatEnum.vertical);
  const horizontal = createBookFormat(BookFormatEnum.horizontal);
  const single = createDisplayMode(DisplayModeEnum.single);
  const book = createDisplayMode(DisplayModeEnum.book);
  const double = createDisplayMode(DisplayModeEnum.double);

  it("bookFormat=signal", () => {
    expect(getLeftImageIndex(createFileNavigator(1, 10), vertical, single)).toBe(1);
    expect(getLeftImageIndex(createFileNavigator(2, 10), vertical, single)).toBe(2);
    expect(getLeftImageIndex(createFileNavigator(1, 10), horizontal, single)).toBe(1);
    expect(getLeftImageIndex(createFileNavigator(2, 10), horizontal, single)).toBe(2);
  });

  it("bookFormat=book", () => {
    expect(getLeftImageIndex(createFileNavigator(1, 10), vertical, book)).toBe(2);
    expect(getLeftImageIndex(createFileNavigator(2, 10), vertical, book)).toBe(2);
    expect(getLeftImageIndex(createFileNavigator(1, 10), horizontal, book)).toBe(1);
    expect(getLeftImageIndex(createFileNavigator(2, 10), horizontal, book)).toBe(1);
  });

  it("bookFormat=double", () => {
    expect(getLeftImageIndex(createFileNavigator(1, 10), vertical, double)).toBe(1);
    expect(getLeftImageIndex(createFileNavigator(2, 10), vertical, double)).toBe(3);
    expect(getLeftImageIndex(createFileNavigator(1, 10), horizontal, double)).toBe(0);
    expect(getLeftImageIndex(createFileNavigator(2, 10), horizontal, double)).toBe(2);
  });
});

describe("getRightImageIndex", () => {
  describe("getLeftImageIndex", () => {
    const vertical = createBookFormat(BookFormatEnum.vertical);
    const horizontal = createBookFormat(BookFormatEnum.horizontal);
    const single = createDisplayMode(DisplayModeEnum.single);
    const book = createDisplayMode(DisplayModeEnum.book);
    const double = createDisplayMode(DisplayModeEnum.double);

    it("bookFormat=signal", () => {
      expect(getRightImageIndex(createFileNavigator(1, 10), vertical, single)).toBeUndefined();
      expect(getRightImageIndex(createFileNavigator(2, 10), vertical, single)).toBeUndefined();
      expect(getRightImageIndex(createFileNavigator(1, 10), horizontal, single)).toBeUndefined();
      expect(getRightImageIndex(createFileNavigator(2, 10), horizontal, single)).toBeUndefined();
    });

    it("bookFormat=book", () => {
      expect(getRightImageIndex(createFileNavigator(1, 10), vertical, book)).toBe(1);
      expect(getRightImageIndex(createFileNavigator(2, 10), vertical, book)).toBe(1);
      expect(getRightImageIndex(createFileNavigator(1, 10), horizontal, book)).toBe(2);
      expect(getRightImageIndex(createFileNavigator(2, 10), horizontal, book)).toBe(2);
    });

    it("bookFormat=double", () => {
      expect(getRightImageIndex(createFileNavigator(1, 10), vertical, double)).toBe(0);
      expect(getRightImageIndex(createFileNavigator(2, 10), vertical, double)).toBe(2);
      expect(getRightImageIndex(createFileNavigator(1, 10), horizontal, double)).toBe(1);
      expect(getRightImageIndex(createFileNavigator(2, 10), horizontal, double)).toBe(3);
    });
  });
});
