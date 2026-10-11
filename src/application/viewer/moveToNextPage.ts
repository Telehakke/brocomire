import { FileNavigator, type FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import {
  Notification,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";

/** 次のページへ移動 */
export const moveToNextPage = (
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
): void => {
  if (!FileNavigator.hasNextFile(fileNavigatorStore.get())) return;

  const { bookFormat, displayMode } = userSettingsStore.get();
  const fn = FileNavigator.incrementIndex(fileNavigatorStore.get(), displayMode);
  fileNavigatorStore.set(fn);
  notificationStore.set(Notification.showMessage(FileNavigator.progress(fn)));
  scrollPercentage2D.setStartPosition(bookFormat);
};
