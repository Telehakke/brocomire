import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import * as IsUserScrolled from "../appState/isUserScrolled";

type UpdateScrollPercentage2DOptions = Readonly<{
  isUserScrolledStore: IsUserScrolled.IsUserScrolledStore;
  scrollPercentage2D: ScrollPercentage2D;
  viewerManager: ViewerManager;
}>;

/** ユーザーがスクロール操作を行なっていれば、スクロールデータを更新 */
export const updateScrollPercentage2D = (o: UpdateScrollPercentage2DOptions): void => {
  if (!o.isUserScrolledStore.get()) return;

  setIsNotUserScrolled(o.isUserScrolledStore);
  _updateScrollPercentage2D(o.viewerManager, o.scrollPercentage2D);
};

/* -------------------------------------------------------------------------- */

const setIsNotUserScrolled = (isUserScrolledStore: IsUserScrolled.IsUserScrolledStore): void => {
  isUserScrolledStore.set(IsUserScrolled.create(false));
};

const _updateScrollPercentage2D = (
  viewerManager: ViewerManager,
  scrollPercentage2D: ScrollPercentage2D,
): void => {
  const x = viewerManager.getScrollXPercentage();
  const y = viewerManager.getScrollYPercentage();
  if (x != null) scrollPercentage2D.setX(x);
  if (y != null) scrollPercentage2D.setY(y);
};
