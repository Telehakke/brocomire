import type {
  FileNavigatorGetter,
  FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import type { NotificationSetter } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import { BookFormatEnum } from "../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import { moveToNextPage } from "./moveToNextPage";
import { moveToPreviousPage } from "./moveToPreviousPage";

/** 右側のページへ移動 */
export const moveToRightPage = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  const { bookFormat } = userSettingsGetter();
  switch (bookFormat) {
    case BookFormatEnum.vertical:
      moveToPreviousPage(
        fileNavigatorGetter,
        fileNavigatorSetter,
        notificationSetter,
        scrollPercentage2D,
        userSettingsGetter,
      );
      break;
    case BookFormatEnum.horizontal:
      moveToNextPage(
        fileNavigatorGetter,
        fileNavigatorSetter,
        notificationSetter,
        scrollPercentage2D,
        userSettingsGetter,
      );
      break;
    default:
      exhaustiveCheck(bookFormat);
  }
};
