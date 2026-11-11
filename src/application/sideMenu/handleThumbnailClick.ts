import type {
  FileNavigatorGetter,
  FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import type { NotificationSetter } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import {
  createZoomPercentage,
  ZOOM_PERCENTAGE_MIN,
  type ZoomPercentageSetter,
} from "../../domain/models/zoom/zoomPercentage";
import { createIsOpenSideMenu, type IsOpenSideMenuSetter } from "../appState/isOpenSideMenu";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** サムネイルをクリックすると実行される処理 */
export const handleThumbnailClick = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  index: number,
  isOpenSideMenuSetter: IsOpenSideMenuSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  zoomPercentageSetter: ZoomPercentageSetter,
): void => {
  moveToIndexPage(
    index,
    fileNavigatorGetter,
    fileNavigatorSetter,
    notificationSetter,
    scrollPercentage2D,
    userSettingsGetter,
  );
  closeSideMenu(isOpenSideMenuSetter);
  resetZoom(zoomPercentageSetter);
};

/* -------------------------------------------------------------------------- */

const closeSideMenu = (isOpenSideMenuSetter: IsOpenSideMenuSetter): void => {
  isOpenSideMenuSetter(createIsOpenSideMenu(false));
};

const resetZoom = (zoomPercentageSetter: ZoomPercentageSetter): void => {
  zoomPercentageSetter(createZoomPercentage(ZOOM_PERCENTAGE_MIN));
};
