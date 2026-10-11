import { FileNavigator, type FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import {
  Notification,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";

/** 前のページに戻る */
export const moveToPreviousPage = (
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
): void => {
  if (!FileNavigator.hasPreviousFile(fileNavigatorStore.get())) return;

  const { bookFormat, displayMode } = userSettingsStore.get();
  const fn = FileNavigator.decrementIndex(fileNavigatorStore.get(), displayMode);
  fileNavigatorStore.set(fn);
  notificationStore.set(Notification.showMessage(FileNavigator.progress(fn)));
  scrollPercentage2D.setEndPosition(bookFormat);
};
