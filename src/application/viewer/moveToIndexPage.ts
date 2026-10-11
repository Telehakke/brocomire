import type { Cache } from "../../domain/models/file/cache";
import { FileNavigator, type FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import {
  Notification,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";

/** 指定したindexのページへ移動 */
export const moveToIndexPage = (
  index: number,
  cache: Cache,
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  const { bookFormat, shouldPreload } = userSettingsStore.get();
  if (shouldPreload) cache.clear();
  const fn = FileNavigator.setCurrentIndex(fileNavigatorStore.get(), index);
  fileNavigatorStore.set(fn);
  notificationStore.set(Notification.showMessage(FileNavigator.progress(fn)));
  scrollPercentage2D.setStartPosition(bookFormat);
  viewerManager.scrollToPct(scrollPercentage2D.x, scrollPercentage2D.y);
};
