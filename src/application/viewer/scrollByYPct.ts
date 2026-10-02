import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";

/** 現在の位置からさらにピクセル値で指定した位置に垂直スクロール */
export const scrollByYPct = (
    amount: number,
    appStore: AppStore,
    userSetting: UserSettings,
): void => {
    const { viewerManager } = appStore.get();
    const { scrollSpeed } = userSetting;
    viewerManager.scrollByPx(0, amount * scrollSpeed.value);
    appStore.set((a) => a.setIsUserScrolled(() => true));
};
