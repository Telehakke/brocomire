import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import { BookFormatEnum } from "../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../domain/models/utils/exhaustiveCheck";
import { moveToNextPage } from "./moveToNextPage";
import { moveToPreviousPage } from "./moveToPreviousPage";

type MoveToLeftPageOptions = Readonly<{
  fileNavigatorStore: FileNavigatorStore;
  notificationStore: NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
}>;

/** 左側のページへ移動 */
export const moveToLeftPage = (o: MoveToLeftPageOptions): void => {
  const { bookFormat } = o.userSettingsGetter();
  switch (bookFormat) {
    case BookFormatEnum.vertical:
      moveToNextPage({ ...o });
      break;
    case BookFormatEnum.horizontal:
      moveToPreviousPage({ ...o });
      break;
    default:
      exhaustiveCheck(bookFormat);
  }
};
