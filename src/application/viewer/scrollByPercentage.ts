import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { createIsUserScrolled, type IsUserScrolledStore } from "../appState/isUserScrolled";

type scrollByPercentageOptions = Readonly<{
  x: number;
  y: number;
  isUserScrolledStore: IsUserScrolledStore;
  scrollPercentage2D: ScrollPercentage2D;
  viewerManager: ViewerManager;
}>;

/** 現在の位置からさらにパーセント単位で指定した位置にスクロール */
export const scrollByPercentage = (o: scrollByPercentageOptions): void => {
  o.isUserScrolledStore.set(createIsUserScrolled(true));
  o.scrollPercentage2D.add(o.x, o.y);
  o.viewerManager.scrollToPercentage(o.scrollPercentage2D.x, o.scrollPercentage2D.y);
};
