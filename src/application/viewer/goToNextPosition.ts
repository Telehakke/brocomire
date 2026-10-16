import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { ScrollStepCount } from "../../domain/models/userSettings/valueObjects/scrollStepCount";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import type { IsUserScrolledStore } from "../appState/isUserScrolled";
import { moveToNextPage } from "./moveToNextPage";
import { updateScrollPercentage2D } from "./updateScrollPercentage2D";

type GoToNextOptions = Readonly<{
  fileNavigatorStore: FileNavigatorStore;
  isUserScrolledStore: IsUserScrolledStore;
  notificationStore: NotificationStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
}>;

/** 次へ進む */
export const goToNextPosition = (o: GoToNextOptions): void => {
  updateScrollPercentage2D({ ...o });
  const { bookFormat, scrollStepCount } = o.userSettingsGetter();
  if (canMoveToNextPage(o.scrollPercentage2D, bookFormat, o.viewerManager)) {
    moveToNextPage({ ...o });
    return;
  }
  _goToNextPosition(o.scrollPercentage2D, bookFormat, scrollStepCount, o.viewerManager);
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
