import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";
import type { AppState } from "../appState/appState";

/** 前後ページの画像ファイルを先読み */
export const preloadFiles = (
    appState: AppState,
    userSettings: UserSettings,
): void => {
    if (!userSettings.shouldPreload.value) return;
    const { cache, fileManager } = appState;
    const { bookFormat, displayMode } = userSettings;
    preloadAfterFiles(cache, fileManager, bookFormat, displayMode);
    preloadBeforeFiles(cache, fileManager, bookFormat, displayMode);
    trimCache(cache, fileManager, bookFormat, displayMode);
};

/* -------------------------------------------------------------------------- */

const preloadAfterFiles = (
    cache: Cache,
    fileManager: FileManager,
    bookFormat: BookFormat,
    displayMode: DisplayMode,
): void => {
    const fm = fileManager.incrementIndex(displayMode);
    const leftIndex = fm.getLeftIndex(bookFormat, displayMode);
    const rightIndex = fm.getRightIndex(bookFormat, displayMode);
    saveCache(cache, fileManager, leftIndex);
    saveCache(cache, fileManager, rightIndex);
};

const preloadBeforeFiles = (
    cache: Cache,
    fileManager: FileManager,
    bookFormat: BookFormat,
    displayMode: DisplayMode,
): void => {
    const fm = fileManager.decrementIndex(displayMode);
    const leftIndex = fm.getLeftIndex(bookFormat, displayMode);
    const rightIndex = fm.getRightIndex(bookFormat, displayMode);
    saveCache(cache, fileManager, leftIndex);
    saveCache(cache, fileManager, rightIndex);
};

const saveCache = (
    cache: Cache,
    fileManager: FileManager,
    index?: number,
): void => {
    if (index == null) return;
    fileManager.getBlob(index, cache);
};

/* -------------------------------------------------------------------------- */

const trimCache = (
    cache: Cache,
    fileManager: FileManager,
    bookFormat: BookFormat,
    displayMode: DisplayMode,
): void => {
    const increasedFM = fileManager.incrementIndex(displayMode);
    const maxIndex = calculateMaxIndex(
        increasedFM.getLeftIndex(bookFormat, displayMode),
        increasedFM.getRightIndex(bookFormat, displayMode),
    );
    if (maxIndex != null) cache.trimAfter(maxIndex);

    const decreasedFM = fileManager.decrementIndex(displayMode);
    const minIndex = calculateMinIndex(
        decreasedFM.getLeftIndex(bookFormat, displayMode),
        increasedFM.getRightIndex(bookFormat, displayMode),
    );
    if (minIndex != null) cache.trimBefore(minIndex);
};

const calculateMaxIndex = (
    leftIndex?: number,
    rightIndex?: number,
): number | undefined => {
    if (leftIndex == null && rightIndex == null) return undefined;
    if (rightIndex == null) return leftIndex;
    if (leftIndex == null) return rightIndex;
    return Math.max(leftIndex, rightIndex);
};

const calculateMinIndex = (
    leftIndex?: number,
    rightIndex?: number,
): number | undefined => {
    if (leftIndex == null && rightIndex == null) return undefined;
    if (rightIndex == null) return leftIndex;
    if (leftIndex == null) return rightIndex;
    return Math.min(leftIndex, rightIndex);
};
