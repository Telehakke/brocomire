import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import { FileNavigator, type FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { NotificationStore } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../../domain/models/viewer/viewerManager";
import { OnViewer, type OnViewerStore } from "../appState/valueObjects/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** 画像ファイルを開く */
export const openImageFiles = (
  cache: Cache,
  fileManager: FileManager,
  fileNavigatorStore: FileNavigatorStore,
  notificationStore: NotificationStore,
  OnViewerStore: OnViewerStore,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsStore: UserSettingsStore,
  viewerManager: ViewerManager,
): void => {
  if (!fileManager.hasFiles()) return;

  fileNavigatorStore.set(FileNavigator.createSafe(0, fileManager.length()));
  OnViewerStore.set(OnViewer.create(true));

  moveToIndexPage(
    0,
    cache,
    fileNavigatorStore,
    notificationStore,
    scrollPercentage2D,
    userSettingsStore,
    viewerManager,
  );
};
