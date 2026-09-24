import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettingsStore";
import { ZoomPct } from "../../domain/models/zoom/zoomPct";
import type { AppStore } from "../appState/appStore";
import { updateHistory } from "./updateHistory";

/** ビューアを閉じる */
export const closeViewer = (
    appStore: AppStore,
    userSettingsStore: UserSettingsStore,
    userSettingsRepository: UserSettingsRepository,
): void => {
    appStore.set((a) => {
        updateHistory(a, userSettingsStore, userSettingsRepository);
        return a.copyWith({
            fileManager: a.fileManager.clear(),
            hashedFileName: "",
            isOpenSideMenu: false,
            onViewer: false,
            zoomPct: ZoomPct.createSafe(),
        });
    });
};
