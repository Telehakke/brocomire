import type { FileManager } from "../../domain/models/file/fileManager";
import type { FileNavigatorStore } from "../../domain/models/file/fileNavigator";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettings";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import { ZoomPercentage, type ZoomPercentageStore } from "../../domain/models/zoom/zoomPercentage";
import { IsOpenSideMenu, type IsOpenSideMenuStore } from "../appState/valueObjects/isOpenSideMenu";
import { OnViewer, type OnViewerStore } from "../appState/valueObjects/onViewer";
import { updateHistory } from "./updateHistory";

/** ビューアを閉じる */
export const closeViewer = (
  fileManager: FileManager,
  fileNavigatorStore: FileNavigatorStore,
  isOpenSideMenuStore: IsOpenSideMenuStore,
  OnViewerStore: OnViewerStore,
  userSettingsStore: UserSettingsStore,
  userSettingsRepository: UserSettingsRepository,
  zoomPercentageStore: ZoomPercentageStore,
): void => {
  updateHistory(fileManager, fileNavigatorStore, userSettingsStore, userSettingsRepository);
  isOpenSideMenuStore.set(IsOpenSideMenu.create(false));
  OnViewerStore.set(OnViewer.create(false));
  zoomPercentageStore.set(ZoomPercentage.createMin());
  fileManager.clear();
};
