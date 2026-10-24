import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import {
  decrementCurrentIndex,
  getLeftImageIndex,
  getRightImageIndex,
  incrementCurrentIndex,
  type FileNavigator,
  type FileNavigatorStore,
} from "../../domain/models/file/fileNavigator";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";

type PreloadFilesOptions = Readonly<{
  cache: Cache;
  fileManager: FileManager;
  fileNavigatorStore: FileNavigatorStore;
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
  fileNavigator: FileNavigator,
): void => {
  const newFileNavigator = incrementCurrentIndex(fileNavigator, displayMode);
  [
    getLeftImageIndex(newFileNavigator, bookFormat, displayMode),
    getRightImageIndex(newFileNavigator, bookFormat, displayMode),
  ].forEach((v) => saveCache(cache, fileManager, v));
};

const preloadBeforeFiles = (
  bookFormat: BookFormat,
  cache: Cache,
  displayMode: DisplayMode,
  fileManager: FileManager,
  fileNavigator: FileNavigator,
): void => {
  const newFileNavigator = decrementCurrentIndex(fileNavigator, displayMode);
  [
    getLeftImageIndex(newFileNavigator, bookFormat, displayMode),
    getRightImageIndex(newFileNavigator, bookFormat, displayMode),
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
  fileNavigator: FileNavigator,
): void => {
  const increasedFN = incrementCurrentIndex(fileNavigator, displayMode);
  const maxIndex = calculateMaxIndex(
    getLeftImageIndex(increasedFN, bookFormat, displayMode),
    getRightImageIndex(increasedFN, bookFormat, displayMode),
  );

  const decreasedFN = decrementCurrentIndex(fileNavigator, displayMode);
  const minIndex = calculateMinIndex(
    getLeftImageIndex(decreasedFN, bookFormat, displayMode),
    getRightImageIndex(decreasedFN, bookFormat, displayMode),
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
