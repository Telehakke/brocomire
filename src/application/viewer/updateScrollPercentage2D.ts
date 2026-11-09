import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { createIsUserScrolled, type IsUserScrolledStore } from "../appState/isUserScrolled";

/** ユーザーがスクロール操作を行なっていれば、スクロールデータを更新 */
export const updateScrollPercentage2D = (
  isUserScrolledStore: IsUserScrolledStore,
  scrollPercentage2D: ScrollPercentage2D,
  viewerManager: ViewerManager,
): void => {
  if (!isUserScrolledStore.get()) return;

  isUserScrolledStore.set(createIsUserScrolled(false));
  scrollPercentage2D.setFromViewerManager(viewerManager);
};
