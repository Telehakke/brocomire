import {
  showNotificationMessage,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import {
  subZoomPercentage,
  ZOOM_PERCENTAGE_MIN,
  type ZoomPercentageStore,
} from "../../domain/models/zoom/zoomPercentage";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { updateScrollPercentage2D } from "./updateScrollPercentage2D";

type ZoomOutOptions = Readonly<{
  isUserScrolledStore: IsUserScrolledStore;
  notificationStore: NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
  zoomPercentageStore: ZoomPercentageStore;
}>;

/** 拡大 */
export const zoomOut = (o: ZoomOutOptions): void => {
  if (o.zoomPercentageStore.get() === ZOOM_PERCENTAGE_MIN) return;

  _zoomOut(o.userSettingsGetter, o.zoomPercentageStore, o.notificationStore);
  updateScrollPercentage2D({ ...o });
};

/* -------------------------------------------------------------------------- */

const _zoomOut = (
  userSettingsGetter: UserSettingsGetter,
  zoomPercentageStore: ZoomPercentageStore,
  notificationStore: NotificationStore,
): void => {
  const { zoomStep } = userSettingsGetter();
  const zoomPercentage = subZoomPercentage(zoomPercentageStore.get(), zoomStep);
  zoomPercentageStore.set(zoomPercentage);
  showMessage(notificationStore, `${zoomPercentage}%`);
};

const showMessage = (notificationStore: NotificationStore, message: string): void => {
  notificationStore.set(showNotificationMessage(message));
};
