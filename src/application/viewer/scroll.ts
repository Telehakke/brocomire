import type { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";

type ScrollOptions = Readonly<{
  scrollPercentage2D: ScrollPercentage2D;
  viewerManager: ViewerManager;
}>;

/** 現在のscrollPercentage2Dの値を元にスクロールする */
export const scroll = (o: ScrollOptions): void => {
  o.viewerManager.scrollToPercentage(o.scrollPercentage2D.x, o.scrollPercentage2D.y);
};
