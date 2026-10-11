import type { Cache } from "../../domain/models/file/cache";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { ZoomPercentage, type ZoomPercentageStore } from "../../domain/models/zoom/zoomPercentage";
import { IsOpenSideMenu, type IsOpenSideMenuStore } from "../appState/valueObjects/isOpenSideMenu";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** サムネイルをクリックすると実行される処理 */
export const handleThumbnailClick = (
  cache: Cache,
  fileNavigatorStore: FileNavigatorStore,
  index: number,
  IsOpenSideMenuStore: IsOpenSideMenuStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
  zoomPercentageStore: ZoomPercentageStore,
): void => {
  moveToIndexPage(
    index,
    cache,
    fileNavigatorStore,
    notificationStore,
    scrollPercentage2D,
    userSettingsStore,
    viewerManager,
  );
  IsOpenSideMenuStore.set(IsOpenSideMenu.create(false));
  zoomPercentageStore.set(ZoomPercentage.createMin());
};
