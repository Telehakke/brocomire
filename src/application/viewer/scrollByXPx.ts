import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { createIsUserScrolled, type IsUserScrolledStore } from "../appState/isUserScrolled";

type ScrollByXPxOptions = Readonly<{
  amount: number;
  isUserScrolledStore: IsUserScrolledStore;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
}>;

/** 現在の位置からさらにピクセル値で指定した位置に水平スクロール */
export const scrollByXPx = (o: ScrollByXPxOptions): void => {
  _scrollByXPx(o.viewerManager, o.amount, o.userSettingsGetter);
  setIsUserScrolled(o.isUserScrolledStore);
};

/* -------------------------------------------------------------------------- */

const _scrollByXPx = (
  viewerManager: ViewerManager,
  amount: number,
  userSettingsGetter: UserSettingsGetter,
): void => {
  const { scrollSpeed } = userSettingsGetter();
  viewerManager.scrollByPx(amount * scrollSpeed, 0);
};

const setIsUserScrolled = (isUserScrolledStore: IsUserScrolledStore): void => {
  isUserScrolledStore.set(createIsUserScrolled(true));
};
