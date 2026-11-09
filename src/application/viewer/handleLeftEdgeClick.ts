import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { goToLeftPosition } from "./goToLeftPosition";
import { goToNextPosition } from "./goToNextPosition";

/** ビューアの左端をクリック */
export const handleLeftEdgeClick = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
): void => {
  if (userSettingsGetter().shouldAdvance) {
    goToNextPosition(
      fileNavigatorStore,
      isUserScrolledStore,
      notificationStore,
      scrollPercentage2D,
      userSettingsGetter,
      viewerManager,
    );
    return;
  }
  goToLeftPosition(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    scrollPercentage2D,
    userSettingsGetter,
    viewerManager,
  );
};
