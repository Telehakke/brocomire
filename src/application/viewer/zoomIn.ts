import {
  showNotificationMessage,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import {
  addZoomPercentage,
  ZOOM_PERCENTAGE_MAX,
  type ZoomPercentageStore,
} from "../../domain/models/zoom/zoomPercentage";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { updateScrollPercentage2D } from "./updateScrollPercentage2D";

/** 拡大 */
export const zoomIn = (
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
  zoomPercentageStore: ZoomPercentageStore,
): void => {
  if (zoomPercentageStore.get() === ZOOM_PERCENTAGE_MAX) return;

  _zoomIn(userSettingsGetter, zoomPercentageStore, notificationStore);
  updateScrollPercentage2D(isUserScrolledStore, scrollPercentage2D, viewerManager);
};

/* -------------------------------------------------------------------------- */

const _zoomIn = (
  userSettingsGetter: UserSettingsGetter,
  zoomPercentageStore: ZoomPercentageStore,
  notificationStore: NotificationStore,
): void => {
  const { zoomStep } = userSettingsGetter();
  const zoomPercentage = addZoomPercentage(zoomPercentageStore.get(), zoomStep);
  zoomPercentageStore.set(zoomPercentage);
  showMessage(notificationStore, `${zoomPercentage}%`);
};

const showMessage = (notificationStore: NotificationStore, message: string): void => {
  notificationStore.set(showNotificationMessage(message));
};
