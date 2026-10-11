import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { IsUserScrolled, type IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";

/** ユーザーがスクロール操作を行なっていれば、スクロールデータを更新 */
export const updateScrollPct2D = (
  isUserScrolledStore: IsUserScrolledStore,
  scrollPercentage2D: ScrollPercentage2D,
  viewerManager: ViewerManager,
): void => {
  if (!isUserScrolledStore.get()) return;

  isUserScrolledStore.set(IsUserScrolled.create(false));
  const x = viewerManager.getScrollXPercentage();
  const y = viewerManager.getScrollYPercentage();
  if (x != null) scrollPercentage2D.setX(x);
  if (y != null) scrollPercentage2D.setY(y);
};
