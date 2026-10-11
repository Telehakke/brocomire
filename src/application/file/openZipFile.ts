import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import { FileNavigator, type FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import { BookId } from "../../domain/models/userSettings/history/bookId";
import { HistoryList } from "../../domain/models/userSettings/history/historyList";
import {
  UserSettings,
  type UserSettingsStore,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { OnViewer, type OnViewerStore } from "../appState/valueObjects/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

export const openZipFile = async (
  cache: Cache,
  fileManager: FileManager,
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  onViewerStore: OnViewerStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  userSettingsRepository: UserSettingsRepository,
  viewerManager: ViewerManager,
): Promise<void> => {
  if (!fileManager.hasFiles()) return;

  fileNavigatorStore.set(FileNavigator.createSafe(0, fileManager.length()));
  onViewerStore.set(OnViewer.create(true));

  const { historyList } = userSettingsStore.get();
  const bookId = BookId.createSafe(fileManager.getHashedFileName());
  const newHistoryList = HistoryList.tryPrepend(historyList, bookId);
  moveToIndexPage(
    HistoryList.getClosedPageIndex(historyList, bookId) ?? 0,
    cache,
    fileNavigatorStore,
    notificationStore,
    scrollPercentage2D,
    userSettingsStore,
    viewerManager,
  );
  userSettingsStore.set(
    UserSettings.setHistoryList(userSettingsStore.get(), newHistoryList, userSettingsRepository),
  );
};
