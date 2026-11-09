import type { FileManager } from "../../domain/models/file/fileManager";
import {
  createFileNavigator,
  type FileNavigatorStore,
} from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import { createBookId } from "../../domain/models/userSettings/history/bookId";
import {
  getClosedPageIndex,
  tryPrependHistoryList,
  type HistoryList,
} from "../../domain/models/userSettings/history/historyList";
import {
  setHistoryList,
  type UserSettingsStore,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import { createOnViewer, type OnViewerStore } from "../appState/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** ファイルを開く */
export const openFile = async (
  fileManager: FileManager,
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  onViewerStore: OnViewerStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  userSettingsRepository: UserSettingsRepository,
): Promise<void> => {
  if (!fileManager.hasFiles()) return;

  const { historyList } = userSettingsStore.get();
  const bookId = createBookId(fileManager.getHashedFileName());
  const newHistoryList = tryPrependHistoryList(historyList, bookId);
  updateHistoryList(userSettingsStore, newHistoryList, userSettingsRepository);
  initFileNavigator(fileNavigatorStore, fileManager.getLength());
  openViewer(onViewerStore);
  moveToIndexPage(
    fileNavigatorStore,
    getClosedPageIndex(historyList, bookId) ?? 0,
    notificationStore,
    scrollPercentage2D,
    () => userSettingsStore.get(),
  );
};

/* -------------------------------------------------------------------------- */

const initFileNavigator = (fileNavigatorStore: FileNavigatorStore, fileLength: number): void => {
  fileNavigatorStore.set(createFileNavigator(0, fileLength));
};

const openViewer = (onViewerStore: OnViewerStore): void => {
  onViewerStore.set(createOnViewer(true));
};

const updateHistoryList = (
  userSettingsStore: UserSettingsStore,
  historyList: HistoryList,
  repository: UserSettingsRepository,
): void => {
  userSettingsStore.set(setHistoryList(userSettingsStore.get(), historyList, repository));
};
