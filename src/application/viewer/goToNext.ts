import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";
import { moveToNextPage } from "./moveToNextPage";
import { updateScrollPct2D } from "./updateScrollPct";

/** 次へ進む */
export const goToNext = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  updateScrollPct2D(isUserScrolledStore, scrollPercentage2D, viewerManager);
  if (canMoveToNextPage(scrollPercentage2D, userSettingsStore, viewerManager)) {
    moveToNextPage(fileNavigatorStore, notificationStore, scrollPercentage2D, userSettingsStore);
    return;
  }
  goToNextOrigin(scrollPercentage2D, userSettingsStore, viewerManager);
};

/* -------------------------------------------------------------------------- */

const canMoveToNextPage = (
  scrollPercentage2D: ScrollPercentage2D,
  userSettingStore: UserSettingsStore,
  viewerManager: ViewerManager,
): boolean => {
  const { bookFormat } = userSettingStore.get();
  return scrollPercentage2D.canMoveToNextPage(
    bookFormat,
    viewerManager.canScrollX(),
    viewerManager.canScrollY(),
  );
};

const goToNextOrigin = (
  scrollPercentage2D: ScrollPercentage2D,
  userSettingStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  const { bookFormat, scrollStepCount } = userSettingStore.get();
  scrollPercentage2D.setNextPosition(bookFormat, scrollStepCount, viewerManager.canScrollY());
  viewerManager.scrollToPct(scrollPercentage2D.x, scrollPercentage2D.y);
};
