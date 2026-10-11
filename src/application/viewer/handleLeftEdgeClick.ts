import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";
import { goToLeft } from "./goToLeft";
import { goToNext } from "./goToNext";

/** ビューアの左端をクリック */
export const handleLeftEdgeClick = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  if (userSettingsStore.get().shouldAdvance) {
    goToNext(
      fileNavigatorStore,
      isUserScrolledStore,
      notificationStore,
      scrollPercentage2D,
      userSettingsStore,
      viewerManager,
    );
    return;
  }
  goToLeft(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    scrollPercentage2D,
    userSettingsStore,
    viewerManager,
  );
};
