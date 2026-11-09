import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";

/** 現在のscrollPercentage2Dの値を元にスクロールする */
export const scroll = (
  scrollPercentage2D: ScrollPercentage2D,
  viewerManager: ViewerManager,
): void => {
  viewerManager.scrollToPercentage(scrollPercentage2D.x, scrollPercentage2D.y);
};
