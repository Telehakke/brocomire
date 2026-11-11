import type {
  FileNavigatorGetter,
  FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import type { NotificationSetter } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { ScrollStepCount } from "../../domain/models/userSettings/valueObjects/scrollStepCount";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledGetter, IsUserScrolledSetter } from "../appState/isUserScrolled";
import { moveToNextPage } from "./moveToNextPage";
import { updateScrollPercentage2D } from "./updateScrollPercentage2D";

/** 次へ進む */
export const goToNextPosition = (
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  isUserScrolledGetter: IsUserScrolledGetter,
  isUserScrolledSetter: IsUserScrolledSetter,
  notificationSetter: NotificationSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
): void => {
  updateScrollPercentage2D(
    isUserScrolledGetter,
    isUserScrolledSetter,
    scrollPercentage2D,
    viewerManager,
  );
  const { bookFormat, scrollStepCount } = userSettingsGetter();
  if (canMoveToNextPage(scrollPercentage2D, bookFormat, viewerManager)) {
    moveToNextPage(
      fileNavigatorGetter,
      fileNavigatorSetter,
      notificationSetter,
      scrollPercentage2D,
      userSettingsGetter,
    );
    return;
  }
  _goToNextPosition(scrollPercentage2D, bookFormat, scrollStepCount, viewerManager);
};

/* -------------------------------------------------------------------------- */

const canMoveToNextPage = (
  scrollPercentage2D: ScrollPercentage2D,
  bookFormat: BookFormat,
  viewerManager: ViewerManager,
): boolean => {
  return scrollPercentage2D.canMoveToNextPage(
    bookFormat,
    viewerManager.canScrollX(),
    viewerManager.canScrollY(),
  );
};

const _goToNextPosition = (
  scrollPercentage2D: ScrollPercentage2D,
  bookFormat: BookFormat,
  scrollStepCount: ScrollStepCount,
  viewerManager: ViewerManager,
): void => {
  scrollPercentage2D.setNextPosition(bookFormat, scrollStepCount, viewerManager.canScrollY());
  viewerManager.scrollToPercentage(scrollPercentage2D.x, scrollPercentage2D.y);
};
