import type { Cache } from "../../domain/models/file/cache";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import {
  createZoomPercentage,
  ZOOM_PERCENTAGE_MIN,
  type ZoomPercentageStore,
} from "../../domain/models/zoom/zoomPercentage";
import { createIsOpenSideMenu, type IsOpenSideMenuStore } from "../appState/isOpenSideMenu";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

type HandleThumbnailClickOptions = Readonly<{
  cache: Cache;
  fileNavigatorStore: FileNavigatorStore;
  index: number;
  isOpenSideMenuStore: IsOpenSideMenuStore;
  notificationStore: NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
  zoomPercentageStore: ZoomPercentageStore;
}>;

/** サムネイルをクリックすると実行される処理 */
export const handleThumbnailClick = (o: HandleThumbnailClickOptions): void => {
  moveToIndexPage({ ...o });
  closeSideMenu(o.isOpenSideMenuStore);
  resetZoom(o.zoomPercentageStore);
};

/* -------------------------------------------------------------------------- */

const closeSideMenu = (isOpenSideMenuStore: IsOpenSideMenuStore): void => {
  isOpenSideMenuStore.set(createIsOpenSideMenu(false));
};

const resetZoom = (zoomPercentageStore: ZoomPercentageStore): void => {
  zoomPercentageStore.set(createZoomPercentage(ZOOM_PERCENTAGE_MIN));
};
