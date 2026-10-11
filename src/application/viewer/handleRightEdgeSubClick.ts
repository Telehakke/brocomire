import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";
import { goToLeft } from "./goToLeft";
import { goToPrevious } from "./goToPrevious";

/** ビューアの右端を右クリック */
export const handleRightEdgeSubClick = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  if (userSettingsStore.get().shouldAdvance) {
    goToPrevious(
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
