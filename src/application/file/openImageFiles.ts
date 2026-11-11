import type { FileManager } from "../../domain/models/file/fileManager";
import {
  createFileNavigator,
  type FileNavigatorGetter,
  type FileNavigatorSetter,
} from "../../domain/models/file/fileNavigator";
import type { NotificationSetter } from "../../domain/models/notification/notification";
import { ScrollPercentage2D } from "../../domain/models/scroll/scrollPercentage2D";
import type { UserSettingsGetter } from "../../domain/models/userSettings/userSettings";
import { createOnViewer, type OnViewerSetter } from "../appState/onViewer";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** 画像ファイルを開く */
export const openImageFiles = (
  fileManager: FileManager,
  fileNavigatorGetter: FileNavigatorGetter,
  fileNavigatorSetter: FileNavigatorSetter,
  notificationSetter: NotificationSetter,
  onViewerSetter: OnViewerSetter,
  scrollPercentage2D: ScrollPercentage2D,
  userSettingsGetter: UserSettingsGetter,
): void => {
  if (!fileManager.hasFiles()) return;

  initFileNavigator(fileNavigatorSetter, fileManager.getLength());
  openViewer(onViewerSetter);
  moveToIndexPage(
    fileNavigatorGetter,
    fileNavigatorSetter,
    0,
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
