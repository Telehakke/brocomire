import type {
  FileNavigatorGetter,
  FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import type { NotificationSetter } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledGetter, IsUserScrolledSetter } from "../appState/isUserScrolled";
import { goToPreviousPosition } from "./goToPreviousPosition";

/** ビューアの下端を右クリック */
export const handleBottomEdgeSubClick = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  isUserScrolledGetter: IsUserScrolledGetter,
  isUserScrolledSetter: IsUserScrolledSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
): void => {
  goToPreviousPosition(
    fileNavigatorGetter,
    fileNavigatorSetter,
    isUserScrolledGetter,
    isUserScrolledSetter,
    notificationSetter,
    scrollPercentage2D,
    userSettingsGetter,
    viewerManager,
  );
};
