import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
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

type CloseViewerOptions = Readonly<{
  bookmarkIndexStore: BookmarkIndexStore;
  cache: Cache;
  fileManager: FileManager;
  fileNavigatorStore: FileNavigatorStore;
  isOpenSideMenuStore: IsOpenSideMenuStore;
  OnViewerStore: OnViewerStore;
  userSettingsStore: UserSettingsStore;
  userSettingsRepository: UserSettingsRepository;
  zoomPercentageStore: ZoomPercentageStore;
}>;

/** ビューアを閉じる */
export const closeViewer = (o: CloseViewerOptions): void => {
  updateHistory({ ...o, fileNavigatorGetter: () => o.fileNavigatorStore.get() });
  o.cache.clear();
  o.fileManager.clear();
  deleteBookmarkIndex(o.bookmarkIndexStore);
  closeSideMenu(o.isOpenSideMenuStore);
  _closeViewer(o.OnViewerStore);
  resetZoom(o.zoomPercentageStore);
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
