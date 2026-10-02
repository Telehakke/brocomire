import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettingsStore";
import { ZoomPct } from "../../domain/models/zoom/zoomPct";
import type { AppState } from "../appState/appState";
import type { AppStore } from "../appState/appStore";
import { updateHistory } from "./updateHistory";

/** ビューアを閉じる */
export const closeViewer = (
    appStore: AppStore,
    userSettingsStore: UserSettingsStore,
    userSettingsRepository: UserSettingsRepository,
): void => {
    updateHistory(appStore.get(), userSettingsStore, userSettingsRepository);
    appStore.set(getNextAppState);
};

/* -------------------------------------------------------------------------- */

const getNextAppState = (prev: AppState): AppState => {
    return prev
        .setFileManager((a) => a.fileManager.clear())
        .setHashedFileName(() => "")
        .setZoomPct(() => ZoomPct.createSafe())
        .setIsOpenSideMenu(() => false)
        .setOnViewer(() => false);
};
