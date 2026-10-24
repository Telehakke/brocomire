import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { createIsUserScrolled, type IsUserScrolledStore } from "../appState/isUserScrolled";

type UpdateScrollPercentage2DOptions = Readonly<{
  isUserScrolledStore: IsUserScrolledStore;
  scrollPercentage2D: ScrollPercentage2D;
  viewerManager: ViewerManager;
}>;

/** ユーザーがスクロール操作を行なっていれば、スクロールデータを更新 */
export const updateScrollPercentage2D = (o: UpdateScrollPercentage2DOptions): void => {
  if (!o.isUserScrolledStore.get()) return;

  o.isUserScrolledStore.set(createIsUserScrolled(false));
  o.scrollPercentage2D.setFromViewerManager(o.viewerManager);
};
