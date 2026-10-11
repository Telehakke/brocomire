import type { BookFormatType } from "../userSettings/valueObjects/bookFormat";
import { DisplayMode, type DisplayModeType } from "../userSettings/valueObjects/displayMode";

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

/* -------------------------------------------------------------------------- */

export const FileNavigator = {
  createSafe(currentIndex: number, fileLength: number): FileNavigator {
    return { currentIndex, fileLength } as FileNavigator;
  },

  getStore(
    getter: () => FileNavigator,
    setter: (value: FileNavigator) => void,
  ): FileNavigatorStore {
    return { get: () => getter(), set: (v) => setter(v) };
  },

  /** 指定したcurrentIndexに更新した新しいオブジェクトを返す */
  setCurrentIndex(input: FileNavigator, currentIndex: number): FileNavigator {
    return create({ ...input, currentIndex });
  },

  /** '現在のページ数 / 総ページ数' */
  progress(input: FileNavigator): string {
    return `${input.currentIndex + 1} / ${input.fileLength}`;
  },

  /** 前のページが存在するかどうか */
  hasPreviousFile(input: FileNavigator): boolean {
    return input.currentIndex > 0;
  },

  /** 次のページが存在するかどうか */
  hasNextFile(input: FileNavigator): boolean {
    return input.currentIndex < input.fileLength - 1;
  },

  /** currentIndexを1または2減らした新しいオブジェクトを返す */
  decrementIndex(input: FileNavigator, displayMode: DisplayMode): FileNavigator {
    const amount = DisplayMode.isSingle(displayMode) ? 1 : 2;
    return create({ ...input, currentIndex: input.currentIndex - amount });
  },

  /** currentIndexを1または2増やした新しいオブジェクトを返す */
  incrementIndex(input: FileNavigator, displayMode: DisplayMode): FileNavigator {
    const amount = DisplayMode.isSingle(displayMode) ? 1 : 2;
    return create({ ...input, currentIndex: input.currentIndex + amount });
  },

  /** ビューアで左側に表示される現在のインデックスを返す */
  getLeftIndex(
    input: FileNavigator,
    bookFormatType: BookFormatType,
    displayModeType: DisplayModeType,
  ): number {
    const amount = leftIndexMap[displayModeType][bookFormatType][getParity(input.currentIndex)];
    return input.currentIndex + amount;
  },

  /** ビューアで右側に表示される現在のインデックスを返す */
  getRightIndex(
    input: FileNavigator,
    bookFormatType: BookFormatType,
    displayModeType: DisplayModeType,
  ): number | undefined {
    const amount = rightIndexMap[displayModeType][bookFormatType][getParity(input.currentIndex)];
    if (amount == null) return undefined;
    return input.currentIndex + amount;
  },
} as const;

const create = (value: FileNavigatorType): FileNavigator => {
  return value as FileNavigator;
};

type Parity = "odd" | "even"; // 奇数・偶数

const getParity = (value: number): Parity => {
  return value % 2 === 1 ? "odd" : "even";
};

const leftIndexMap: Record<DisplayModeType, Record<BookFormatType, Record<Parity, number>>> = {
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
  DisplayModeType,
  Record<BookFormatType, Record<Parity, number | undefined>>
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
