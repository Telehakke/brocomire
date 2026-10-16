import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import * as FileNavigator from "../../domain/models/file/fileNavigator";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";

type PreloadFilesOptions = Readonly<{
  cache: Cache;
  fileManager: FileManager;
  fileNavigatorStore: FileNavigator.FileNavigatorStore;
  userSettingsGetter: UserSettingsGetter;
}>;

/** 前後ページの画像ファイルを先読み */
export const preloadFiles = (o: PreloadFilesOptions): void => {
  if (!o.userSettingsGetter().shouldPreload) return;

  const { bookFormat, displayMode } = o.userSettingsGetter();
  preloadAfterFiles(bookFormat, o.cache, displayMode, o.fileManager, o.fileNavigatorStore.get());
  preloadBeforeFiles(bookFormat, o.cache, displayMode, o.fileManager, o.fileNavigatorStore.get());
  trimCache(bookFormat, o.cache, displayMode, o.fileNavigatorStore.get());
};

/* -------------------------------------------------------------------------- */

const preloadAfterFiles = (
  bookFormat: BookFormat,
  cache: Cache,
  displayMode: DisplayMode,
  fileManager: FileManager,
  fileNavigator: FileNavigator.FileNavigator,
): void => {
  const newFileNavigator = FileNavigator.incrementIndex(fileNavigator, displayMode);
  [
    FileNavigator.getLeftIndex(newFileNavigator, bookFormat, displayMode),
    FileNavigator.getRightIndex(newFileNavigator, bookFormat, displayMode),
  ].forEach((v) => saveCache(cache, fileManager, v));
};

const preloadBeforeFiles = (
  bookFormat: BookFormat,
  cache: Cache,
  displayMode: DisplayMode,
  fileManager: FileManager,
  fileNavigator: FileNavigator.FileNavigator,
): void => {
  const newFileNavigator = FileNavigator.decrementIndex(fileNavigator, displayMode);
  [
    FileNavigator.getLeftIndex(newFileNavigator, bookFormat, displayMode),
    FileNavigator.getRightIndex(newFileNavigator, bookFormat, displayMode),
  ].forEach((v) => saveCache(cache, fileManager, v));
};

const saveCache = (cache: Cache, fileManager: FileManager, index?: number): void => {
  if (index == null) return;

  void fileManager.getBlob(index, cache);
};

/* -------------------------------------------------------------------------- */

const trimCache = (
  bookFormat: BookFormat,
  cache: Cache,
  displayMode: DisplayMode,
  fileNavigator: FileNavigator.FileNavigator,
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
