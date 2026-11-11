import type { FileManager } from "../../domain/models/file/fileManager";
import {
  createFileNavigator,
  type FileNavigatorGetter,
  type FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import type { NotificationSetter } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import { createBookId } from "../../domain/models/userSettings/history/bookId";
import {
  getClosedPageIndex,
  tryPrependHistoryList,
  type HistoryList,
} from "../../domain/models/userSettings/history/historyList";
import {
  setHistoryList,
  type UserSettingsGetter,
  type UserSettingsSetter,
} from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import { createOnViewer, type OnViewerSetter } from "../appState/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** ファイルを開く */
export const openFile = async (
  fileManager: FileManager,
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  notificationSetter: NotificationSetter,
  onViewerSetter: OnViewerSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
  userSettingsSetter: UserSettingsSetter,
  userSettingsRepository: UserSettingsRepository,
): Promise<void> => {
  if (!fileManager.hasFiles()) return;

  const { historyList } = userSettingsGetter();
  const bookId = createBookId(fileManager.getHashedFileName());
  const newHistoryList = tryPrependHistoryList(historyList, bookId);
  updateHistoryList(userSettingsGetter, userSettingsSetter, newHistoryList, userSettingsRepository);
  initFileNavigator(fileNavigatorSetter, fileManager.getLength());
  openViewer(onViewerSetter);
  moveToIndexPage(
    fileNavigatorGetter,
    fileNavigatorSetter,
    getClosedPageIndex(historyList, bookId) ?? 0,
    notificationSetter,
    scrollPercentage2D,
    userSettingsGetter,
  );
};

/* -------------------------------------------------------------------------- */

const initFileNavigator = (fileNavigatorSetter: FileNavigatorSetter, fileLength: number): void => {
  fileNavigatorSetter(createFileNavigator(0, fileLength));
};

const openViewer = (onViewerSetter: OnViewerSetter): void => {
  onViewerSetter(createOnViewer(true));
};

const updateHistoryList = (
  userSettingsGetter: UserSettingsGetter,
  userSettingsSetter: UserSettingsSetter,
  historyList: HistoryList,
  repository: UserSettingsRepository,
): void => {
  userSettingsSetter(setHistoryList(userSettingsGetter(), historyList, repository));
};
