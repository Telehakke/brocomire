import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";

/** 現在の位置からさらにピクセル値で指定した位置に垂直スクロール */
export const scrollByYPct = (
    amount: number,
    appStore: AppStore,
    userSetting: UserSettings,
): void => {
    appStore.set((a) => {
        a.viewerManager.scrollByPx(0, amount * userSetting.scrollSpeed.value);
        return a.copyWith({
            isUserScrolled: true,
        });
    });
};
