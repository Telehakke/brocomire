import type { BookFormatValue } from "../userSettings/valueObjects/bookFormat";
import {
  DisplayModeEnum,
  type DisplayMode,
  type DisplayModeValue,
} from "../userSettings/valueObjects/displayMode";

type FileNavigatorType = Readonly<{
  currentIndex: number;
  fileLength: number;
}>;

declare const FileNavigatorBrand: unique symbol;

export type FileNavigator = FileNavigatorType & { [FileNavigatorBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type FileNavigatorStore = {
  get(): FileNavigator;
  set(value: FileNavigator): void;
};

export type FileNavigatorGetter = () => FileNavigator;

/* -------------------------------------------------------------------------- */

export const createFileNavigator = (currentIndex: number, fileLength: number): FileNavigator => {
  return { currentIndex, fileLength } as FileNavigator;
};

export const getFileNavigatorStore = (
  getter: () => FileNavigator,
  setter: (value: FileNavigator) => void,
): FileNavigatorStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

/** inputに新たなcurrentIndexをセットした新しいオブジェクトを返す */
export const copyFileNavigatorWithCurrentIndex = (
  input: FileNavigator,
  currentIndex: number,
): FileNavigator => {
  return { ...input, currentIndex };
};

/** '現在のページ数 / 総ページ数' */
export const getFileNavigatorProgress = (input: FileNavigator): string => {
  return `${input.currentIndex + 1} / ${input.fileLength}`;
};

/** 前のページが存在するかどうか */
export const hasPreviousFile = (input: FileNavigator): boolean => {
  return input.currentIndex > 0;
};

/** 次のページが存在するかどうか */
export const hasNextFile = (input: FileNavigator): boolean => {
  return input.currentIndex < input.fileLength - 1;
};

/** currentIndexを1または2減らした新しいオブジェクトを返す */
export const decrementCurrentIndex = (
  input: FileNavigator,
  displayMode: DisplayMode,
): FileNavigator => {
  const amount = displayMode === DisplayModeEnum.single ? 1 : 2;
  return {
    ...input,
    currentIndex: Math.max(input.currentIndex - amount, 0),
  };
};

/** currentIndexを1または2増やした新しいオブジェクトを返す */
export const incrementCurrentIndex = (
  input: FileNavigator,
  displayMode: DisplayMode,
): FileNavigator => {
  const amount = displayMode === DisplayModeEnum.single ? 1 : 2;
  return {
    ...input,
    currentIndex: Math.min(input.currentIndex + amount, input.fileLength - 1),
  };
};

/** ビューアの左側に表示される画像リストのインデックスを返す */
export const getLeftImageIndex = (
  input: FileNavigator,
  bookFormat: BookFormatValue,
  displayMode: DisplayModeValue,
): number => {
  const amount = leftImageIndexMap[displayMode][bookFormat][getOddEven(input.currentIndex)];
  return input.currentIndex + amount;
};

/** ビューアの右側に表示される画像リストのインデックスを返す */
export const getRightImageIndex = (
  input: FileNavigator,
  bookFormat: BookFormatValue,
  displayMode: DisplayModeValue,
): number | undefined => {
  const amount = rightImageIndexMap[displayMode][bookFormat][getOddEven(input.currentIndex)];
  if (amount == null) return undefined;
  return input.currentIndex + amount;
};

/* -------------------------------------------------------------------------- */

type Parity = "odd" | "even"; // 奇数・偶数

const getOddEven = (value: number): Parity => {
  return value % 2 === 1 ? "odd" : "even";
};

const leftImageIndexMap: Record<
  DisplayModeValue,
  Record<BookFormatValue, Record<Parity, number>>
> = {
  single: {
    vertical: { odd: 0, even: 0 },
    horizontal: { odd: 0, even: 0 },
  },
  book: {
    // 画像の並び：[0,-] -> [2,1] -> [4,3] -> ...
    // 奇数インデックスは右ページなので+1補正する
    // 偶数インデックスは左ページなので補正の必要性なし
    vertical: { odd: 1, even: 0 },
    // 画像の並び：[-,0] -> [1,2] -> [3,4] -> ...
    // 奇数インデックスは左ページなので補正の必要性なし
    // 偶数インデックスは右ページなので-1補正する
    horizontal: { odd: 0, even: -1 },
  },
  double: {
    // 画像の並び：[1,0] -> [3,2] -> [5,4] -> ...
    // 奇数インデックスは左ページなので補正の必要性なし
    // 偶数インデックスは右ページなので+1補正する
    vertical: { odd: 0, even: 1 },
    // 画像の並び：[0,1] -> [2,3] -> [4,5] -> ...
    // 奇数インデックスは右ページなので-1補正する
    // 偶数インデックスは左ページなので補正の必要性なし
    horizontal: { odd: -1, even: 0 },
  },
};

const rightImageIndexMap: Record<
  DisplayModeValue,
  Record<BookFormatValue, Record<Parity, number | undefined>>
> = {
  single: {
    // 右ページでは使用しない
    vertical: { odd: undefined, even: undefined },
    horizontal: { odd: undefined, even: undefined },
  },
  book: {
    // 画像の並び：[0,-] -> [2,1] -> [4,3] -> ...
    // 奇数インデックスは右ページなので補正の必要性なし
    // 偶数インデックスは左ページなので-1補正する
    vertical: { odd: 0, even: -1 },
    // 画像の並び：[-,0] -> [1,2] -> [3,4] -> ...
    // 奇数インデックスは左ページなので+1補正する
    // 偶数インデックスは右ページなので補正の必要性なし
    horizontal: { odd: 1, even: 0 },
  },
  double: {
    // 画像の並び：[1,0] -> [3,2] -> [5,4] -> ...
    // 奇数インデックスは左ページなので-1補正する
    // 偶数インデックスは右ページなので補正の必要性なし
    vertical: { odd: -1, even: 0 },
    // 画像の並び：[0,1] -> [2,3] -> [4,5] -> ...
    // 奇数インデックスは右ページなので補正の必要性なし
    // 偶数インデックスは左ページなので+1補正する
    horizontal: { odd: 0, even: 1 },
  },
};
