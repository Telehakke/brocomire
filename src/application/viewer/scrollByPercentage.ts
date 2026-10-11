import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { IsUserScrolled, type IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";

/** 現在の位置からさらにパーセント単位で指定した位置にスクロール */
export const scrollByPercentage = (
  x: number,
  y: number,
  isUserScrolledStore: IsUserScrolledStore,
  scrollPercentage2D: ScrollPercentage2D,
  viewerManager: ViewerManager,
): void => {
  isUserScrolledStore.set(IsUserScrolled.create(true));
  scrollPercentage2D.add(x, y);
  viewerManager.scrollToPct(scrollPercentage2D.x, scrollPercentage2D.y);
};
