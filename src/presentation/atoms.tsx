import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { ChevronMark } from "../application/appState/valueObjects/chevronMark";
import { ImageSize } from "../application/appState/valueObjects/imageSize";
import { InfoVisibility } from "../application/appState/valueObjects/infoVisibility";
import { IsLandscape } from "../application/appState/valueObjects/isLandscape";
import { IsOpenSideMenu } from "../application/appState/valueObjects/isOpenSideMenu";
import { IsUserScrolled } from "../application/appState/valueObjects/isUserScrolled";
import { OnViewer } from "../application/appState/valueObjects/onViewer";
import type { Cache } from "../domain/models/file/cache";
import type { FileManager } from "../domain/models/file/fileManager";
import { FileNavigator } from "../domain/models/file/fileNavigator";
import { Notification } from "../domain/models/notification/notification";
import { ScrollPercentage2D } from "../domain/models/scroll/scrollPercentage2D";
import { UserSettings } from "../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../domain/models/viewer/viewerManager";
import { ZoomPercentage } from "../domain/models/zoom/zoomPercentage";
import { BlobCache } from "../infrastructure/file/blobCache";
import { NullFileManager } from "../infrastructure/file/nullFileManager";
import { ImageViewerManager } from "../infrastructure/viewer/imageViewerManager";

export const cacheAtom = atom<Cache>(() => new BlobCache());
export const chevronMarkAtom = atom(ChevronMark.create("none"));
export const fileManagerAtom = atom<FileManager>(new NullFileManager());
export const fileNavigatorAtom = atom(FileNavigator.createSafe(0, 0));
export const imageSizeAtom = atom(ImageSize.create({ width: 0, height: 0 }));
export const infoVisibilityAtom = atom(InfoVisibility.create("visible"));
export const isImageWiderThanViewerAtom = atom<boolean | undefined>(undefined);
export const isLandscapeAtom = atom(IsLandscape.create(false));
export const isLoadingAtom = atom(false);
export const isOpenSideMenuAtom = atom(IsOpenSideMenu.create(false));
export const isUserScrolledAtom = atom(IsUserScrolled.create(false));
export const notificationAtom = atom(Notification.init());
export const onInvertFilterAtom = atom(false);
export const onSharpeningFilterAtom = atom(false);
export const onViewerAtom = atom(OnViewer.create(false));
export const scrollPercentage2DAtom = atom(() => new ScrollPercentage2D());
export const viewerManagerAtom = atom<ViewerManager>(() => new ImageViewerManager());
export const zoomPercentageAtom = atom(ZoomPercentage.createMin());

export const Atom = {
  userSettings: atom(UserSettings.createSafe()),
} as const;

export const UserSettingsAtom = {
  bookFormat: selectAtom(Atom.userSettings, (u) => u.bookFormat),
  contentFit: selectAtom(Atom.userSettings, (u) => u.contentFit),
  displayMode: selectAtom(Atom.userSettings, (u) => u.displayMode),
  historyList: selectAtom(Atom.userSettings, (u) => u.historyList),
  isSafeAreaEnabled: selectAtom(Atom.userSettings, (u) => u.isSafeAreaEnabled),
  isSmoothScrollEnabled: selectAtom(Atom.userSettings, (u) => u.isSmoothScrollEnabled),
  longPressRecognitionTime: selectAtom(Atom.userSettings, (u) => u.longPressRecognitionTime),
  safeAreaLength: selectAtom(Atom.userSettings, (u) => u.safeAreaLength),
  scrollSpeed: selectAtom(Atom.userSettings, (u) => u.scrollSpeed),
  scrollStepCount: selectAtom(Atom.userSettings, (u) => u.scrollStepCount),
  sharpeningFilterStrength: selectAtom(Atom.userSettings, (u) => u.sharpeningFilterStrength),
  shouldAdvance: selectAtom(Atom.userSettings, (u) => u.shouldAdvance),
  shouldPreload: selectAtom(Atom.userSettings, (u) => u.shouldPreload),
  shouldShowFullscreenButton: selectAtom(Atom.userSettings, (u) => u.shouldShowFullscreenButton),
  shouldShowInvertButton: selectAtom(Atom.userSettings, (u) => u.shouldShowInvertButton),
  shouldShowSharpeningFilterButton: selectAtom(
    Atom.userSettings,
    (u) => u.shouldShowSharpeningFilterButton,
  ),
  tapAreaSize: selectAtom(Atom.userSettings, (u) => u.tapAreaSize),
  zoomStep: selectAtom(Atom.userSettings, (u) => u.zoomStep),
} as const;
