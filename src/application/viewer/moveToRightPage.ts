import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import { BookFormatEnum } from "../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import { moveToNextPage } from "./moveToNextPage";
import { moveToPreviousPage } from "./moveToPreviousPage";

/** 右側のページへ移動 */
export const moveToRightPage = (
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  const { bookFormat } = userSettingsGetter();
  switch (bookFormat) {
    case BookFormatEnum.vertical:
      moveToPreviousPage(
        fileNavigatorStore,
        notificationStore,
        scrollPercentage2D,
        userSettingsGetter,
      );
      break;
    case BookFormatEnum.horizontal:
      moveToNextPage(fileNavigatorStore, notificationStore, scrollPercentage2D, userSettingsGetter);
      break;
    default:
      exhaustiveCheck(bookFormat);
  }
};
