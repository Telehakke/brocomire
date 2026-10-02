import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";

/** 現在の位置からさらにピクセル値で指定した位置に水平スクロール */
export const scrollByXPct = (
    amount: number,
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { viewerManager } = appStore.get();
    const { scrollSpeed } = userSettings;
    viewerManager.scrollByPx(amount * scrollSpeed.value, 0);
    appStore.set((a) => a.setIsUserScrolled(() => true));
};
