import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import {
  createFileNavigator,
  type FileNavigatorStore,
} from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { createOnViewer, type OnViewerStore } from "../appState/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

type openImageFilesOptions = Readonly<{
  cache: Cache;
  fileManager: FileManager;
  fileNavigatorStore: FileNavigatorStore;
  notificationStore: NotificationStore;
  onViewerStore: OnViewerStore;
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

const initFileNavigator = (fileNavigatorStore: FileNavigatorStore, fileLength: number): void => {
  fileNavigatorStore.set(createFileNavigator(0, fileLength));
};

const openViewer = (onViewerStore: OnViewerStore): void => {
  onViewerStore.set(createOnViewer(true));
};
