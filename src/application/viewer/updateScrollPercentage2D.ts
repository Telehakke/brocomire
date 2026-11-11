import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import {
  createIsUserScrolled,
  type IsUserScrolledGetter,
  type IsUserScrolledSetter,
} from "../appState/isUserScrolled";

/** ユーザーがスクロール操作を行なっていれば、スクロールデータを更新 */
export const updateScrollPercentage2D = (
  isUserScrolledGetter: IsUserScrolledGetter,
  isUserScrolledSetter: IsUserScrolledSetter,
  scrollPercentage2D: ScrollPercentage2D,
  viewerManager: ViewerManager,
): void => {
  if (!isUserScrolledGetter()) return;

  isUserScrolledSetter(createIsUserScrolled(false));
  scrollPercentage2D.setFromViewerManager(viewerManager);
};
