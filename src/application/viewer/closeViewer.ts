import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorGetter } from "../../domain/models/file/fileNavigator";
import type {
  UserSettingsGetter,
  UserSettingsSetter,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import {
  createZoomPercentage,
  ZOOM_PERCENTAGE_MIN,
  type ZoomPercentageSetter,
} from "../../domain/models/zoom/zoomPercentage";
import type { BookmarkIndexSetter } from "../appState/bookmarkIndex";
import { createIsOpenSideMenu, type IsOpenSideMenuSetter } from "../appState/isOpenSideMenu";
import { createOnViewer, type OnViewerSetter } from "../appState/onViewer";
import { updateHistory } from "./updateHistory";

/** ビューアを閉じる */
export const closeViewer = (
  bookmarkIndexSetter: BookmarkIndexSetter,
  cache: Cache,
  fileManager: FileManager,
  fileNavigatorGetter: FileNavigatorGetter,
  isOpenSideMenuSetter: IsOpenSideMenuSetter,
  onViewerSetter: OnViewerSetter,
  userSettingsGetter: UserSettingsGetter,
  userSettingsSetter: UserSettingsSetter,
  userSettingsRepository: UserSettingsRepository,
  zoomPercentageSetter: ZoomPercentageSetter,
): void => {
  updateHistory(
    fileManager,
    fileNavigatorGetter,
    userSettingsGetter,
    userSettingsSetter,
    userSettingsRepository,
  );
  cache.clear();
  fileManager.clear();
  deleteBookmarkIndex(bookmarkIndexSetter);
  closeSideMenu(isOpenSideMenuSetter);
  _closeViewer(onViewerSetter);
  resetZoom(zoomPercentageSetter);
};

/* -------------------------------------------------------------------------- */

const deleteBookmarkIndex = (bookmarkIndexSetter: BookmarkIndexSetter): void => {
  bookmarkIndexSetter(undefined);
};

const closeSideMenu = (isOpenSideMenuSetter: IsOpenSideMenuSetter): void => {
  isOpenSideMenuSetter(createIsOpenSideMenu(false));
};

const _closeViewer = (onViewerSetter: OnViewerSetter): void => {
  onViewerSetter(createOnViewer(false));
};

const resetZoom = (zoomPercentageSetter: ZoomPercentageSetter): void => {
  zoomPercentageSetter(createZoomPercentage(ZOOM_PERCENTAGE_MIN));
};
