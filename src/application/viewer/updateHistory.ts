import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorGetter } from "../../domain/models/file/fileNavigator";
import * as History from "../../domain/models/userSettings/history/history";
import * as HistoryList from "../../domain/models/userSettings/history/historyList";
import * as UserSettings from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";

type UpdateHistoryOptions = Readonly<{
  fileManager: FileManager;
  fileNavigatorGetter: FileNavigatorGetter;
  userSettingsStore: UserSettings.UserSettingsStore;
  userSettingsRepository: UserSettingsRepository;
}>;

/** 履歴の更新 */
export const updateHistory = (o: UpdateHistoryOptions): void => {
  const userSettings = o.userSettingsStore.get();
  o.userSettingsStore.set(
    UserSettings.setHistoryList(
      userSettings,
      HistoryList.update(
        userSettings.historyList,
        History.createSafe(o.fileManager.getHashedFileName(), o.fileNavigatorGetter().currentIndex),
      ),
      o.userSettingsRepository,
    ),
  );
};
