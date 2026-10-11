import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { IsUserScrolled, type IsUserScrolledStore } from "../appState/valueObjects/isUserScrolled";

/** 現在の位置からさらにピクセル値で指定した位置に垂直スクロール */
export const scrollByYPx = (
  amount: number,
  isUserScrolledStore: IsUserScrolledStore,
  userSettingStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  const { scrollSpeed } = userSettingStore.get();
  viewerManager.scrollByPx(0, amount * scrollSpeed);
  isUserScrolledStore.set(IsUserScrolled.create(true));
};
