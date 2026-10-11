import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";
import { goToNext } from "./goToNext";
import { goToPrevious } from "./goToPrevious";

/** 右側へ進む */
export const goToRight = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  const { bookFormat } = userSettingsStore.get();
  switch (bookFormat) {
    case "vertical":
      goToPrevious(
        fileNavigatorStore,
        isUserScrolledStore,
        notificationStore,
        scrollPercentage2D,
        userSettingsStore,
        viewerManager,
      );
      break;
    case "horizontal":
      goToNext(
        fileNavigatorStore,
        isUserScrolledStore,
        notificationStore,
        scrollPercentage2D,
        userSettingsStore,
        viewerManager,
      );
      break;
    default:
      exhaustiveCheck(bookFormat);
  }
};
