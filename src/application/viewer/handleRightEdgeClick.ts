import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { goToNextPosition } from "./goToNextPosition";
import { goToRightPosition } from "./goToRightPosition";

type HandleRightEdgeClickOptions = Readonly<{
  fileNavigatorStore: FileNavigatorStore;
  isUserScrolledStore: IsUserScrolledStore;
  notificationStore: NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
}>;

/** ビューアの右端をクリック */
export const handleRightEdgeClick = (o: HandleRightEdgeClickOptions): void => {
  if (o.userSettingsGetter().shouldAdvance) {
    goToNextPosition({ ...o });
    return;
  }
  goToRightPosition({ ...o });
};
