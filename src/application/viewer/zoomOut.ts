import {
  Notification,
  type NotificationStore,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { ZoomPercentage, type ZoomPercentageStore } from "../../domain/models/zoom/zoomPercentage";
import type { IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";
import { updateScrollPct2D } from "./updateScrollPct";

/** 拡大 */
export const zoomOut = (
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
  zoomPercentageStore: ZoomPercentageStore,
): void => {
  updateScrollPct2D(isUserScrolledStore, scrollPercentage2D, viewerManager);
  const { zoomStep } = userSettingsStore.get();
  const zoomPercentage = ZoomPercentage.zoomOut(zoomPercentageStore.get(), zoomStep);
  notificationStore.set(Notification.showMessage(`${zoomPercentage}%`));
  zoomPercentageStore.set(zoomPercentage);
};
