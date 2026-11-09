import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { ScrollStepCount } from "../../domain/models/userSettings/valueObjects/scrollStepCount";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { moveToPreviousPage } from "./moveToPreviousPage";
import { updateScrollPercentage2D } from "./updateScrollPercentage2D";

/** 前へ戻る */
export const goToPreviousPosition = (
  fileNavigatorStore: FileNavigatorStore,
  isUserScrolledStore: IsUserScrolledStore,
  notificationStore: NotificationStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
): void => {
  updateScrollPercentage2D(isUserScrolledStore, scrollPercentage2D, viewerManager);
  const { bookFormat, scrollStepCount } = userSettingsGetter();
  if (canMoveToPreviousPage(scrollPercentage2D, bookFormat, viewerManager)) {
    moveToPreviousPage(
      fileNavigatorStore,
      notificationStore,
      scrollPercentage2D,
      userSettingsGetter,
    );
    return;
  }
  _goToPreviousPosition(scrollPercentage2D, bookFormat, scrollStepCount, viewerManager);
};

/* -------------------------------------------------------------------------- */

const canMoveToPreviousPage = (
  scrollPercentage2D: ScrollPercentage2D,
  bookFormat: BookFormat,
  viewerManager: ViewerManager,
): boolean => {
  return scrollPercentage2D.canMoveToPreviousPage(
    bookFormat,
    viewerManager.canScrollX(),
    viewerManager.canScrollY(),
  );
};

const _goToPreviousPosition = (
  scrollPercentage2D: ScrollPercentage2D,
  bookFormat: BookFormat,
  scrollStepCount: ScrollStepCount,
  viewerManager: ViewerManager,
): void => {
  scrollPercentage2D.setPreviousPosition(bookFormat, scrollStepCount, viewerManager.canScrollY());
  viewerManager.scrollToPercentage(scrollPercentage2D.x, scrollPercentage2D.y);
};
