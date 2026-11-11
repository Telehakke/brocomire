import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { createIsUserScrolled, type IsUserScrolledSetter } from "../appState/isUserScrolled";

/** 現在の位置からさらにパーセント単位で指定した位置にスクロール */
export const scrollByPercentage = (
  x: number,
  y: number,
  isUserScrolledSetter: IsUserScrolledSetter,
  scrollPercentage2D: ScrollPercentage2D,
  viewerManager: ViewerManager,
): void => {
  isUserScrolledSetter(createIsUserScrolled(true));
  scrollPercentage2D.add(x, y);
  viewerManager.scrollToPercentage(scrollPercentage2D.x, scrollPercentage2D.y);
};
