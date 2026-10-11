import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import { FileNavigator, type FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";

/** 前後ページの画像ファイルを先読み */
export const preloadFiles = (
  userSettings: UserSettings,
  cache: Cache,
  fileManager: FileManager,
  fileNavigatorStore: FileNavigatorStore,
): void => {
  if (!userSettings.shouldPreload) return;
  const { bookFormat, displayMode } = userSettings;
  preloadAfterFiles(cache, fileManager, fileNavigatorStore.get(), bookFormat, displayMode);
  preloadBeforeFiles(cache, fileManager, fileNavigatorStore.get(), bookFormat, displayMode);
  trimCache(cache, fileNavigatorStore.get(), bookFormat, displayMode);
};

/* -------------------------------------------------------------------------- */

const preloadAfterFiles = (
  cache: Cache,
  fileManager: FileManager,
  fileNavigator: FileNavigator,
  bookFormat: BookFormat,
  displayMode: DisplayMode,
): void => {
  const fn = FileNavigator.incrementIndex(fileNavigator, displayMode);
  const leftIndex = FileNavigator.getLeftIndex(fn, bookFormat, displayMode);
  const rightIndex = FileNavigator.getRightIndex(fn, bookFormat, displayMode);
  saveCache(cache, fileManager, leftIndex);
  saveCache(cache, fileManager, rightIndex);
};

const preloadBeforeFiles = (
  cache: Cache,
  fileManager: FileManager,
  fileNavigator: FileNavigator,
  bookFormat: BookFormat,
  displayMode: DisplayMode,
): void => {
  const fn = FileNavigator.decrementIndex(fileNavigator, displayMode);
  const leftIndex = FileNavigator.getLeftIndex(fn, bookFormat, displayMode);
  const rightIndex = FileNavigator.getRightIndex(fn, bookFormat, displayMode);
  saveCache(cache, fileManager, leftIndex);
  saveCache(cache, fileManager, rightIndex);
};

const saveCache = (cache: Cache, fileManager: FileManager, index?: number): void => {
  if (index == null) return;
  void fileManager.getBlob(index, cache);
};

/* -------------------------------------------------------------------------- */

const trimCache = (
  cache: Cache,
  fileNavigator: FileNavigator,
  bookFormat: BookFormat,
  displayMode: DisplayMode,
): void => {
  const increasedFN = FileNavigator.incrementIndex(fileNavigator, displayMode);
  const maxIndex = calculateMaxIndex(
    FileNavigator.getLeftIndex(increasedFN, bookFormat, displayMode),
    FileNavigator.getRightIndex(increasedFN, bookFormat, displayMode),
  );

  const decreasedFN = FileNavigator.decrementIndex(fileNavigator, displayMode);
  const minIndex = calculateMinIndex(
    FileNavigator.getLeftIndex(decreasedFN, bookFormat, displayMode),
    FileNavigator.getRightIndex(decreasedFN, bookFormat, displayMode),
  );
  if (minIndex != null && maxIndex != null) cache.trim(minIndex, maxIndex);
};

const calculateMaxIndex = (leftIndex?: number, rightIndex?: number): number | undefined => {
  if (leftIndex == null && rightIndex == null) return undefined;
  if (rightIndex == null) return leftIndex;
  if (leftIndex == null) return rightIndex;
  return Math.max(leftIndex, rightIndex);
};

const calculateMinIndex = (leftIndex?: number, rightIndex?: number): number | undefined => {
  if (leftIndex == null && rightIndex == null) return undefined;
  if (rightIndex == null) return leftIndex;
  if (leftIndex == null) return rightIndex;
  return Math.min(leftIndex, rightIndex);
};
