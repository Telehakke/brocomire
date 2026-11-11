import { BookX } from "lucide-solid";
import type { JSX } from "solid-js/jsx-runtime";
import { closeViewer } from "../../../../application/viewer/closeViewer";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  bookmarkIndexSignal,
  cacheSignal,
  fileManagerSignal,
  fileNavigatorSignal,
  isOpenSideMenuSignal,
  onViewerSignal,
  userSettingsStore,
  zoomPercentageSignal,
} from "../../../signals";
import { LargeIconButton } from "../../utils/LargeIconButton";

export const ViewerCloseButton = (): JSX.Element => {
  return (
    <LargeIconButton text="本を閉じる" onClick={runCloseViewer}>
      <BookX class="size-8" />
    </LargeIconButton>
  );
};

const runCloseViewer = (): void => {
  const [, setBookmarkIndex] = bookmarkIndexSignal;
  const [cache] = cacheSignal;
  const [fileManager] = fileManagerSignal;
  const [fileNavigator] = fileNavigatorSignal;
  const [, setIsOpenSideMenu] = isOpenSideMenuSignal;
  const [, setOnViewer] = onViewerSignal;
  const [userSettings, setUserSettings] = userSettingsStore;
  const [, setZoomPercentage] = zoomPercentageSignal;

  closeViewer(
    (v) => setBookmarkIndex(v),
    cache(),
    fileManager(),
    () => fileNavigator(),
    (v) => setIsOpenSideMenu(v),
    (v) => setOnViewer(v),
    () => userSettings,
    (v) => setUserSettings(v),
    new LocalStorageUserSettingsRepository(),
    (v) => setZoomPercentage(v),
  );
};
