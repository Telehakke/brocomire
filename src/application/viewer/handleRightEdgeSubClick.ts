import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { goToLeftPosition } from "./goToLeftPosition";
import { goToPreviousPosition } from "./goToPreviousPosition";

type HandleRightEdgeSubClickOptions = Readonly<{
  fileNavigatorStore: FileNavigatorStore;
  isUserScrolledStore: IsUserScrolledStore;
  notificationStore: NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
}>;

/** ビューアの右端を右クリック */
export const handleRightEdgeSubClick = (o: HandleRightEdgeSubClickOptions): void => {
  if (o.userSettingsGetter().shouldAdvance) {
    goToPreviousPosition({ ...o });
    return;
  }
  goToLeftPosition({ ...o });
};
