import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { goToPreviousPosition } from "./goToPreviousPosition";
import { goToRightPosition } from "./goToRightPosition";

type HandleLeftEdgeSubClickOptions = Readonly<{
  fileNavigatorStore: FileNavigatorStore;
  isUserScrolledStore: IsUserScrolledStore;
  notificationStore: NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
}>;

/** ビューアの左端を右クリック */
export const handleLeftEdgeSubClick = (o: HandleLeftEdgeSubClickOptions): void => {
  if (o.userSettingsGetter().shouldAdvance) {
    goToPreviousPosition({ ...o });
    return;
  }
  goToRightPosition({ ...o });
};
