import {
  getFileNavigatorProgress,
  hasNextFile,
  incrementCurrentIndex,
  type FileNavigatorGetter,
  type FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import {
  showNotificationMessage,
  type NotificationSetter,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";

/** 次のページへ移動 */
export const moveToNextPage = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  if (!hasNextFile(fileNavigatorGetter())) return;

  const { bookFormat, displayMode } = userSettingsGetter();
  _moveToNextPage(fileNavigatorGetter, fileNavigatorSetter, displayMode, notificationSetter);
  scrollPercentage2D.setStartPosition(bookFormat);
  // スクロール処理は画像が生成されてから行うため、ここではスクロール位置だけを設定する
};

/* -------------------------------------------------------------------------- */

const _moveToNextPage = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  displayMode: DisplayMode,
  notificationSetter: NotificationSetter,
): void => {
  const fileNavigator = incrementCurrentIndex(fileNavigatorGetter(), displayMode);
  fileNavigatorSetter(fileNavigator);
  showMessage(notificationSetter, getFileNavigatorProgress(fileNavigator));
};

const showMessage = (notificationSetter: NotificationSetter, message: string): void => {
  notificationSetter(showNotificationMessage(message));
};
