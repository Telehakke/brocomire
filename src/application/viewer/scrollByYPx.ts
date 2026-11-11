import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { createIsUserScrolled, type IsUserScrolledSetter } from "../appState/isUserScrolled";

/** 現在の位置からさらにピクセル値で指定した位置に垂直スクロール */
export const scrollByYPx = (
  amount: number,
  isUserScrolledSetter: IsUserScrolledSetter,
  userSettingsGetter: UserSettingsGetter,
  viewerManager: ViewerManager,
): void => {
  _scrollByYPx(viewerManager, amount, userSettingsGetter);
  setIsUserScrolled(isUserScrolledSetter);
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

const setIsUserScrolled = (isUserScrolledSetter: IsUserScrolledSetter): void => {
  isUserScrolledSetter(createIsUserScrolled(true));
};
