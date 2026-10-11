import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import { moveToNextPage } from "./moveToNextPage";
import { moveToPreviousPage } from "./moveToPreviousPage";

/** 右側のページへ移動 */
export const moveToRightPage = (
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
): void => {
  const { bookFormat } = userSettingsStore.get();
  switch (bookFormat) {
    case "vertical":
      moveToPreviousPage(
        fileNavigatorStore,
        notificationStore,
        scrollPercentage2D,
        userSettingsStore,
      );
      break;
    case "horizontal":
      moveToNextPage(fileNavigatorStore, notificationStore, scrollPercentage2D, userSettingsStore);
      break;
    default:
      exhaustiveCheck(bookFormat);
  }
};
