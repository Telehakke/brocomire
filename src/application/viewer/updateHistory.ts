import { History } from "../../domain/models/userSettings/history/history";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettingsStore";
import type { AppState } from "../appState/appState";

/** 履歴の更新 */
export const updateHistory = (
    appState: AppState,
    userSettingsStore: UserSettingsStore,
    userSettingsRepository: UserSettingsRepository,
): void => {
    const { fileManager, hashedFileName } = appState;
    userSettingsStore.set((u) =>
        u.setHistories(
            (v) =>
                v.histories.update(
                    History.createSafe(hashedFileName, fileManager.getIndex()),
                ),
            userSettingsRepository,
        ),
    );
};
