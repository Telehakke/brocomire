import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import { History } from "../../domain/models/userSettings/history/history";
import { HistoryList } from "../../domain/models/userSettings/history/historyList";
import {
  UserSettings,
  type UserSettingsStore,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

/** 履歴の更新 */
export const updateHistory = (
  fileManager: FileManager,
  fileNavigatorStore: FileNavigatorStore,
  userSettingsStore: UserSettingsStore,
  userSettingsRepository: UserSettingsRepository,
): void => {
  const userSettings = userSettingsStore.get();
  const historyList = HistoryList.update(
    userSettings.historyList,
    History.createSafe(fileManager.getHashedFileName(), fileNavigatorStore.get().currentIndex),
  );
  userSettingsStore.set(
    UserSettings.setHistoryList(userSettings, historyList, userSettingsRepository),
  );
};
