import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import * as IsUserScrolled from "../appState/isUserScrolled";

type ScrollByYPxOptions = Readonly<{
  amount: number;
  isUserScrolledStore: IsUserScrolled.IsUserScrolledStore;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
}>;

/** 現在の位置からさらにピクセル値で指定した位置に垂直スクロール */
export const scrollByYPx = (o: ScrollByYPxOptions): void => {
  _scrollByYPx(o.viewerManager, o.amount, o.userSettingsGetter);
  setIsUserScrolled(o.isUserScrolledStore);
};

/* -------------------------------------------------------------------------- */

const _scrollByYPx = (
  viewerManager: ViewerManager,
  amount: number,
  userSettingsGetter: UserSettingsGetter,
): void => {
  const { scrollSpeed } = userSettingsGetter();
  viewerManager.scrollByPx(0, amount * scrollSpeed);
};

const setIsUserScrolled = (isUserScrolledStore: IsUserScrolled.IsUserScrolledStore): void => {
  isUserScrolledStore.set(IsUserScrolled.create(true));
};
