import {
  decrementCurrentIndex,
  getFileNavigatorProgress,
  hasPreviousFile,
  type FileNavigatorStore,
} from "../../domain/models/file/fileNavigator";
import {
  showNotificationMessage,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";

/** 前のページに戻る */
export const moveToPreviousPage = (
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  if (!hasPreviousFile(fileNavigatorStore.get())) return;

  const { bookFormat, displayMode } = userSettingsGetter();
  _moveToNextPage(fileNavigatorStore, displayMode, notificationStore);
  scrollPercentage2D.setEndPosition(bookFormat);
  // スクロール処理は画像が生成されてから行うため、ここではスクロール位置だけを設定する
};

/* -------------------------------------------------------------------------- */

const _moveToNextPage = (
  fileNavigatorStore: FileNavigatorStore,
  displayMode: DisplayMode,
  notificationStore: NotificationStore,
): void => {
  const fileNavigator = decrementCurrentIndex(fileNavigatorStore.get(), displayMode);
  fileNavigatorStore.set(fileNavigator);
  showMessage(notificationStore, getFileNavigatorProgress(fileNavigator));
};

const showMessage = (notificationStore: NotificationStore, message: string): void => {
  notificationStore.set(showNotificationMessage(message));
};
