import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { IsUserScrolled, type IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";

/** 現在の位置からさらにピクセル値で指定した位置に水平スクロール */
export const scrollByXPx = (
  amount: number,
  isUserScrolledStore: IsUserScrolledStore,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  const { scrollSpeed } = userSettingsStore.get();
  viewerManager.scrollByPx(amount * scrollSpeed, 0);
  isUserScrolledStore.set(IsUserScrolled.create(true));
};
