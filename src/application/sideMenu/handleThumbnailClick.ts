import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import {
  createZoomPercentage,
  ZOOM_PERCENTAGE_MIN,
  type ZoomPercentageStore,
} from "../../domain/models/zoom/zoomPercentage";
import { createIsOpenSideMenu, type IsOpenSideMenuStore } from "../appState/isOpenSideMenu";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** サムネイルをクリックすると実行される処理 */
export const handleThumbnailClick = (
  fileNavigatorStore: FileNavigatorStore,
  index: number,
  isOpenSideMenuStore: IsOpenSideMenuStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  zoomPercentageStore: ZoomPercentageStore,
): void => {
  moveToIndexPage(
    fileNavigatorStore,
    index,
    notificationStore,
    scrollPercentage2D,
    userSettingsGetter,
  );
  closeSideMenu(isOpenSideMenuStore);
  resetZoom(zoomPercentageStore);
};

/* -------------------------------------------------------------------------- */

const closeSideMenu = (isOpenSideMenuStore: IsOpenSideMenuStore): void => {
  isOpenSideMenuStore.set(createIsOpenSideMenu(false));
};

const resetZoom = (zoomPercentageStore: ZoomPercentageStore): void => {
  zoomPercentageStore.set(createZoomPercentage(ZOOM_PERCENTAGE_MIN));
};
