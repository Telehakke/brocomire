import * as Notification from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import * as ZoomPercentage from "../../domain/models/zoom/zoomPercentage";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { updateScrollPercentage2D } from "./updateScrollPercentage2D";

type ZoomInOptions = Readonly<{
  isUserScrolledStore: IsUserScrolledStore;
  notificationStore: Notification.NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
  zoomPercentageStore: ZoomPercentage.ZoomPercentageStore;
}>;

/** 拡大 */
export const zoomIn = (o: ZoomInOptions): void => {
  if (ZoomPercentage.isMax(o.zoomPercentageStore.get())) return;

  _zoomIn(o.userSettingsGetter, o.zoomPercentageStore, o.notificationStore);
  updateScrollPercentage2D({ ...o });
};

/* -------------------------------------------------------------------------- */

const _zoomIn = (
  userSettingsGetter: UserSettingsGetter,
  zoomPercentageStore: ZoomPercentage.ZoomPercentageStore,
  notificationStore: Notification.NotificationStore,
): void => {
  const { zoomStep } = userSettingsGetter();
  const zoomPercentage = ZoomPercentage.zoomIn(zoomPercentageStore.get(), zoomStep);
  zoomPercentageStore.set(zoomPercentage);
  showMessage(notificationStore, `${zoomPercentage}%`);
};

const showMessage = (notificationStore: Notification.NotificationStore, message: string): void => {
  notificationStore.set(Notification.showMessage(message));
};
