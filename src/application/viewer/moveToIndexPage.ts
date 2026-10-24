import {
  copyFileNavigatorWithCurrentIndex,
  getFileNavigatorProgress,
  type FileNavigatorStore,
} from "../../domain/models/file/fileNavigator";
import {
  showNotificationMessage,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";

type MoveToIndexPageOptions = Readonly<{
  fileNavigatorStore: FileNavigatorStore;
  index: number;
  notificationStore: NotificationStore;
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
  fileNavigatorStore: FileNavigatorStore,
  index: number,
  notificationStore: NotificationStore,
): void => {
  const fileNavigator = copyFileNavigatorWithCurrentIndex(fileNavigatorStore.get(), index);
  fileNavigatorStore.set(fileNavigator);
  showMessage(notificationStore, getFileNavigatorProgress(fileNavigator));
};

const showMessage = (notificationStore: NotificationStore, message: string): void => {
  notificationStore.set(showNotificationMessage(message));
};
