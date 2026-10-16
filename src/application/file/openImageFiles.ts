import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import * as FileNavigator from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import * as OnViewer from "../appState/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

type openImageFilesOptions = Readonly<{
  cache: Cache;
  fileManager: FileManager;
  fileNavigatorStore: FileNavigator.FileNavigatorStore;
  notificationStore: NotificationStore;
  onViewerStore: OnViewer.OnViewerStore;
  scrollPercentage2D: ScrollPercentage2D;
  userSettingsGetter: UserSettingsGetter;
  viewerManager: ViewerManager;
}>;

/** 画像ファイルを開く */
export const openImageFiles = (o: openImageFilesOptions): void => {
  if (!o.fileManager.hasFiles()) return;

  initFileNavigator(o.fileNavigatorStore, o.fileManager.getLength());
  openViewer(o.onViewerStore);
  moveToIndexPage({ index: 0, ...o });
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
