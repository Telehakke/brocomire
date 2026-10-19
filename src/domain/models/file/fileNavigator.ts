import type { BookFormatValue } from "../userSettings/valueObjects/bookFormat";
import * as DisplayMode from "../userSettings/valueObjects/displayMode";

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

export const create = (value: FileNavigatorType): FileNavigator => {
  return value as FileNavigator;
};

export const getStore = (
  getter: () => FileNavigator,
  setter: (value: FileNavigator) => void,
): FileNavigatorStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

/** inputに新たなcurrentIndexをセットした新しいオブジェクトを返す */
export const withCurrentIndex = (input: FileNavigator, currentIndex: number): FileNavigator => {
  return create({ ...input, currentIndex });
};

/** '現在のページ数 / 総ページ数' */
export const getProgress = (input: FileNavigator): string => {
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
export const decrementIndex = (
  input: FileNavigator,
  displayMode: DisplayMode.DisplayMode,
): FileNavigator => {
  const amount = DisplayMode.isSingle(displayMode) ? 1 : 2;
  return create({ ...input, currentIndex: Math.max(input.currentIndex - amount, 0) });
};

/** currentIndexを1または2増やした新しいオブジェクトを返す */
export const incrementIndex = (
  input: FileNavigator,
  displayMode: DisplayMode.DisplayMode,
): FileNavigator => {
  const amount = DisplayMode.isSingle(displayMode) ? 1 : 2;
  return create({
    ...input,
    currentIndex: Math.min(input.currentIndex + amount, input.fileLength - 1),
  });
};

/** ビューアで左側に表示される現在のインデックスを返す */
export const getLeftIndex = (
  input: FileNavigator,
  bookFormat: BookFormatValue,
  displayMode: DisplayMode.DisplayModeValue,
): number => {
  const amount = leftIndexMap[displayMode][bookFormat][getParity(input.currentIndex)];
  return input.currentIndex + amount;
};

/** ビューアで右側に表示される現在のインデックスを返す */
export const getRightIndex = (
  input: FileNavigator,
  bookFormat: BookFormatValue,
  displayMode: DisplayMode.DisplayModeValue,
): number | undefined => {
  const amount = rightIndexMap[displayMode][bookFormat][getParity(input.currentIndex)];
  if (amount == null) return undefined;
  return input.currentIndex + amount;
};

type Parity = "odd" | "even"; // 奇数・偶数

const getParity = (value: number): Parity => {
  return value % 2 === 1 ? "odd" : "even";
};

const leftIndexMap: Record<
  DisplayMode.DisplayModeValue,
  Record<BookFormatValue, Record<Parity, number>>
> = {
  single: {
    vertical: { odd: 0, even: 0 },
    horizontal: { odd: 0, even: 0 },
  },
  book: {
    // 奇数インデックスは右ページに該当するため、左ページは+1（[0,-] -> [2,1] -> [4,3] -> ...）
    vertical: { odd: 1, even: 0 },
    // 偶数インデックスは右ページに該当するため、左ページは-1（[-,0] -> [1,2] -> [3,4] -> ...）
    horizontal: { odd: 0, even: -1 },
  },
  double: {
    // 偶数インデックスは右ページに該当するため、左ページは+1（[1,0] -> [3,2] -> [5,4] -> ...）
    vertical: { odd: 0, even: 1 },
    // 奇数インデックスは右ページに該当するため、左ページは-1（[0,1] -> [2,3] -> [4,5] -> ...）
    horizontal: { odd: -1, even: 0 },
  },
};

const rightIndexMap: Record<
  DisplayMode.DisplayModeValue,
  Record<BookFormatValue, Record<Parity, number | undefined>>
> = {
  single: {
    // 右ページは使用しない
    vertical: { odd: undefined, even: undefined },
    horizontal: { odd: undefined, even: undefined },
  },
  book: {
    // 偶数インデックスは左ページに該当するため、右ページは-1（[0,-] -> [2,1] -> [4,3] -> ...）
    vertical: { odd: 0, even: -1 },
    // 奇数インデックスは左ページに該当するため、右ページは+1（[-,0] -> [1,2] -> [3,4] -> ...）
    horizontal: { odd: 1, even: 0 },
  },
  double: {
    // 奇数インデックスは左ページに該当するため、右ページは-1（[1,0] -> [3,2] -> [5,4] -> ...）
    vertical: { odd: -1, even: 0 },
    // 偶数インデックスは左ページに該当するため、右ページは+1（[0,1] -> [2,3] -> [4,5] -> ...）
    horizontal: { odd: 0, even: 1 },
  },
};
