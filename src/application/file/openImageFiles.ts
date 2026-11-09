import type { FileManager } from "../../domain/models/file/fileManager";
import {
  createFileNavigator,
  type FileNavigatorStore,
} from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import { createOnViewer, type OnViewerStore } from "../appState/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** 画像ファイルを開く */
export const openImageFiles = (
  fileManager: FileManager,
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  onViewerStore: OnViewerStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  if (!fileManager.hasFiles()) return;

  initFileNavigator(fileNavigatorStore, fileManager.getLength());
  openViewer(onViewerStore);
  moveToIndexPage(fileNavigatorStore, 0, notificationStore, scrollPercentage2D, userSettingsGetter);
};

/* -------------------------------------------------------------------------- */

const initFileNavigator = (fileNavigatorStore: FileNavigatorStore, fileLength: number): void => {
  fileNavigatorStore.set(createFileNavigator(0, fileLength));
};

const openViewer = (onViewerStore: OnViewerStore): void => {
  onViewerStore.set(createOnViewer(true));
};
