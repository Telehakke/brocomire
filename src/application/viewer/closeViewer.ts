import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorGetter } from "../../domain/models/file/fileNavigator";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import {
  createZoomPercentage,
  ZOOM_PERCENTAGE_MIN,
  type ZoomPercentageStore,
} from "../../domain/models/zoom/zoomPercentage";
import type { BookmarkIndexStore } from "../appState/bookmarkIndex";
import { createIsOpenSideMenu, type IsOpenSideMenuStore } from "../appState/isOpenSideMenu";
import { createOnViewer, type OnViewerStore } from "../appState/onViewer";
import { updateHistory } from "./updateHistory";

/** ビューアを閉じる */
export const closeViewer = (
  bookmarkIndexStore: BookmarkIndexStore,
  cache: Cache,
  fileManager: FileManager,
  fileNavigatorGetter: FileNavigatorGetter,
  isOpenSideMenuStore: IsOpenSideMenuStore,
  onViewerStore: OnViewerStore,
  userSettingsStore: UserSettingsStore,
  userSettingsRepository: UserSettingsRepository,
  zoomPercentageStore: ZoomPercentageStore,
): void => {
  updateHistory(fileManager, fileNavigatorGetter, userSettingsStore, userSettingsRepository);
  cache.clear();
  fileManager.clear();
  deleteBookmarkIndex(bookmarkIndexStore);
  closeSideMenu(isOpenSideMenuStore);
  _closeViewer(onViewerStore);
  resetZoom(zoomPercentageStore);
};

/* -------------------------------------------------------------------------- */

const deleteBookmarkIndex = (bookmarkIndexStore: BookmarkIndexStore): void => {
  bookmarkIndexStore.set(undefined);
};

const closeSideMenu = (isOpenSideMenuStore: IsOpenSideMenuStore): void => {
  isOpenSideMenuStore.set(createIsOpenSideMenu(false));
};

const _closeViewer = (onViewerStore: OnViewerStore): void => {
  onViewerStore.set(createOnViewer(false));
};

const resetZoom = (zoomPercentageStore: ZoomPercentageStore): void => {
  zoomPercentageStore.set(createZoomPercentage(ZOOM_PERCENTAGE_MIN));
};
