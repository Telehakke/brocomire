import {
  copyFileNavigatorWithCurrentIndex,
  getFileNavigatorProgress,
  type FileNavigatorGetter,
  type FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import {
  showNotificationMessage,
  type NotificationSetter,
} from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";

/** 指定したindexのページへ移動 */
export const moveToIndexPage = (
  index: number,
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  updateFileNavigator(index, fileNavigatorGetter, fileNavigatorSetter, notificationSetter);
  const { bookFormat } = userSettingsGetter();
  scrollPercentage2D.setStartPosition(bookFormat);
  // スクロール処理は画像が生成されてから行うため、ここではスクロール位置だけを設定する
};

/* -------------------------------------------------------------------------- */

const updateFileNavigator = (
  index: number,
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  notificationSetter: NotificationSetter,
): void => {
  const fileNavigator = copyFileNavigatorWithCurrentIndex(fileNavigatorGetter(), index);
  fileNavigatorSetter(fileNavigator);
  showMessage(notificationSetter, getFileNavigatorProgress(fileNavigator));
};

const showMessage = (notificationSetter: NotificationSetter, message: string): void => {
  notificationSetter(showNotificationMessage(message));
};
