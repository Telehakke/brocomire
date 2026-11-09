import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorGetter } from "../../domain/models/file/fileNavigator";
import { createHistory } from "../../domain/models/userSettings/history/history";
import { updateHistoryList } from "../../domain/models/userSettings/history/historyList";
import {
  setHistoryList,
  type UserSettingsStore,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

/** 履歴の更新 */
export const updateHistory = (
  fileManager: FileManager,
  fileNavigatorGetter: FileNavigatorGetter,
  userSettingsStore: UserSettingsStore,
  userSettingsRepository: UserSettingsRepository,
): void => {
  const userSettings = userSettingsStore.get();
  userSettingsStore.set(
    setHistoryList(
      userSettings,
      updateHistoryList(
        userSettings.historyList,
        createHistory(fileManager.getHashedFileName(), fileNavigatorGetter().currentIndex),
      ),
      userSettingsRepository,
    ),
  );
};
