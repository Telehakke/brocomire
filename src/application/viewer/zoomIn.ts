import {
  showNotificationMessage,
  type NotificationSetter,
} from "../../domain/models/notification/notification";
import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import {
  addZoomPercentage,
  ZOOM_PERCENTAGE_MAX,
  type ZoomPercentageGetter,
  type ZoomPercentageSetter,
} from "../../domain/models/zoom/zoomPercentage";
import type { IsUserScrolledGetter, IsUserScrolledSetter } from "../appState/isUserScrolled";
import { updateScrollPercentage2D } from "./updateScrollPercentage2D";

/** 拡大 */
export const zoomIn = (
  isUserScrolledGetter: IsUserScrolledGetter,
  isUserScrolledSetter: IsUserScrolledSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
  zoomPercentageGetter: ZoomPercentageGetter,
  zoomPercentageSetter: ZoomPercentageSetter,
): void => {
  if (zoomPercentageGetter() === ZOOM_PERCENTAGE_MAX) return;

  updateScrollPercentage2D(
    isUserScrolledGetter,
    isUserScrolledSetter,
    scrollPercentage2D,
    viewerManager,
  );
  _zoomIn(userSettingsGetter, zoomPercentageGetter, zoomPercentageSetter, notificationSetter);
};

/* -------------------------------------------------------------------------- */

const _zoomIn = (
  userSettingsGetter: UserSettingsGetter,
  zoomPercentageGetter: ZoomPercentageGetter,
  zoomPercentageSetter: ZoomPercentageSetter,
  notificationSetter: NotificationSetter,
): void => {
  const { zoomStep } = userSettingsGetter();
  const zoomPercentage = addZoomPercentage(zoomPercentageGetter(), zoomStep);
  zoomPercentageSetter(zoomPercentage);
  showMessage(notificationSetter, `${zoomPercentage}%`);
};

const showMessage = (notificationSetter: NotificationSetter, message: string): void => {
  notificationSetter(showNotificationMessage(message));
};
