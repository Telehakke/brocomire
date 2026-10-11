import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";
import { goToPrevious } from "./goToPrevious";

/** ビューアの下端を右クリック */
export const handleBottomEdgeSubClick = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  goToPrevious(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    scrollPercentage2D,
    userSettingsStore,
    viewerManager,
  );
};
