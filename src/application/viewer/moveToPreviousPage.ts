import {
  decrementCurrentIndex,
  getFileNavigatorProgress,
  hasPreviousFile,
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

/** 前のページに戻る */
export const moveToPreviousPage = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  if (!hasPreviousFile(fileNavigatorGetter())) return;

  const { bookFormat, displayMode } = userSettingsGetter();
  _moveToNextPage(fileNavigatorGetter, fileNavigatorSetter, displayMode, notificationSetter);
  scrollPercentage2D.setEndPosition(bookFormat);
  // スクロール処理は画像が生成されてから行うため、ここではスクロール位置だけを設定する
};

/* -------------------------------------------------------------------------- */

const _moveToNextPage = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  displayMode: DisplayMode,
  notificationSetter: NotificationSetter,
): void => {
  const fileNavigator = decrementCurrentIndex(fileNavigatorGetter(), displayMode);
  fileNavigatorSetter(fileNavigator);
  showMessage(notificationSetter, getFileNavigatorProgress(fileNavigator));
};

const showMessage = (notificationSetter: NotificationSetter, message: string): void => {
  notificationSetter(showNotificationMessage(message));
};
