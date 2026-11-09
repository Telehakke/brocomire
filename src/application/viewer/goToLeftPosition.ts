import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import { BookFormatEnum } from "../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { goToNextPosition } from "./goToNextPosition";
import { goToPreviousPosition } from "./goToPreviousPosition";

/** 左側へ進む */
export const goToLeftPosition = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
): void => {
  const { bookFormat } = userSettingsGetter();
  switch (bookFormat) {
    case BookFormatEnum.vertical:
      goToNextPosition(
        fileNavigatorStore,
        isUserScrolledStore,
        notificationStore,
        scrollPercentage2D,
        userSettingsGetter,
        viewerManager,
      );
      break;
    case BookFormatEnum.horizontal:
      goToPreviousPosition(
        fileNavigatorStore,
        isUserScrolledStore,
        notificationStore,
        scrollPercentage2D,
        userSettingsGetter,
        viewerManager,
      );
      break;
    default:
      exhaustiveCheck(bookFormat);
  }
};
