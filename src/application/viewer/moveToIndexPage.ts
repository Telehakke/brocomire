import * as FileNavigator from "../../domain/models/file/fileNavigator";
import * as Notification from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";

type MoveToIndexPageOptions = Readonly<{
  fileNavigatorStore: FileNavigator.FileNavigatorStore;
  index: number;
  notificationStore: Notification.NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
}>;

/** 指定したindexのページへ移動 */
export const moveToIndexPage = (o: MoveToIndexPageOptions): void => {
  updateFileNavigator(o.fileNavigatorStore, o.index, o.notificationStore);
  const { bookFormat } = o.userSettingsGetter();
  o.scrollPercentage2D.setStartPosition(bookFormat);
  // スクロール処理は画像が生成されてから行うため、ここではスクロール位置だけを設定する
};

/* -------------------------------------------------------------------------- */

const updateFileNavigator = (
  fileNavigatorStore: FileNavigator.FileNavigatorStore,
  index: number,
  notificationStore: Notification.NotificationStore,
): void => {
  const fileNavigator = FileNavigator.withCurrentIndex(fileNavigatorStore.get(), index);
  fileNavigatorStore.set(fileNavigator);
  showMessage(notificationStore, FileNavigator.getProgress(fileNavigator));
};

const showMessage = (notificationStore: Notification.NotificationStore, message: string): void => {
  notificationStore.set(Notification.showMessage(message));
};
