import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import * as FileNavigator from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import * as BookId from "../../domain/models/userSettings/history/bookId";
import * as HistoryList from "../../domain/models/userSettings/history/historyList";
import * as UserSettings from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import * as OnViewer from "../appState/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

type OpenZipFileOptions = Readonly<{
  cache: Cache;
  fileManager: FileManager;
  fileNavigatorStore: FileNavigator.FileNavigatorStore;
  notificationStore: NotificationStore;
  onViewerStore: OnViewer.OnViewerStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsStore: UserSettings.UserSettingsStore;
  userSettingsRepository: UserSettingsRepository;
  viewerManager: ViewerManager;
}>;

/** Zipファイルを開く */
export const openZipFile = async (o: OpenZipFileOptions): Promise<void> => {
  if (!o.fileManager.hasFiles()) return;

  initFileNavigator(o.fileNavigatorStore, o.fileManager.getLength());
  openViewer(o.onViewerStore);
  const { historyList } = o.userSettingsStore.get();
  const bookId = BookId.createSafe(o.fileManager.getHashedFileName());
  const newHistoryList = HistoryList.tryPrepend(historyList, bookId);
  updateHistoryList(o.userSettingsStore, newHistoryList, o.userSettingsRepository);
  moveToIndexPage({
    index: HistoryList.getClosedPageIndex(historyList, bookId) ?? 0,
    userSettingsGetter: () => o.userSettingsStore.get(),
    ...o,
  });
};

/* -------------------------------------------------------------------------- */

const initFileNavigator = (
  fileNavigatorStore: FileNavigator.FileNavigatorStore,
  fileLength: number,
): void => {
  fileNavigatorStore.set(FileNavigator.create({ currentIndex: 0, fileLength }));
};

const openViewer = (onViewerStore: OnViewer.OnViewerStore): void => {
  onViewerStore.set(OnViewer.create(true));
};

const updateHistoryList = (
  userSettingsStore: UserSettings.UserSettingsStore,
  historyList: HistoryList.HistoryList,
  repository: UserSettingsRepository,
): void => {
  userSettingsStore.set(
    UserSettings.setHistoryList(userSettingsStore.get(), historyList, repository),
  );
};
