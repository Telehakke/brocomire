import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import * as ZoomPercentage from "../../domain/models/zoom/zoomPercentage";
import type { BookmarkIndexStore } from "../appState/bookmarkIndex";
import * as IsOpenSideMenu from "../appState/isOpenSideMenu";
import * as OnViewer from "../appState/onViewer";
import { updateHistory } from "./updateHistory";

type CloseViewerOptions = Readonly<{
  bookmarkIndexStore: BookmarkIndexStore;
  cache: Cache;
  fileManager: FileManager;
  fileNavigatorStore: FileNavigatorStore;
  isOpenSideMenuStore: IsOpenSideMenu.IsOpenSideMenuStore;
  OnViewerStore: OnViewer.OnViewerStore;
  userSettingsStore: UserSettingsStore;
  userSettingsRepository: UserSettingsRepository;
  zoomPercentageStore: ZoomPercentage.ZoomPercentageStore;
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

const closeSideMenu = (isOpenSideMenuStore: IsOpenSideMenu.IsOpenSideMenuStore): void => {
  isOpenSideMenuStore.set(IsOpenSideMenu.create(false));
};

const _closeViewer = (onViewerStore: OnViewer.OnViewerStore): void => {
  onViewerStore.set(OnViewer.create(false));
};

const resetZoom = (zoomPercentageStore: ZoomPercentage.ZoomPercentageStore): void => {
  zoomPercentageStore.set(ZoomPercentage.createMin());
};
