import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { createBookmarkIndex } from "../application/appState/bookmarkIndex";
import { createChevronMark } from "../application/appState/chevronMark";
import { createImageSize } from "../application/appState/imageSize";
import { createInfoVisibility } from "../application/appState/infoVisibility";
import { createIsImageWiderThanViewer } from "../application/appState/isImageWiderThanViewer";
import { createIsLandscape } from "../application/appState/isLandscape";
import { createIsLoading } from "../application/appState/isLoading";
import { createIsOpenSideMenu } from "../application/appState/isOpenSideMenu";
import { createIsUserScrolled } from "../application/appState/isUserScrolled";
import { createOnInvertFilter } from "../application/appState/onInvertFilter";
import { createOnSharpeningFilter } from "../application/appState/onSharpeningFilter";
import { createOnViewer } from "../application/appState/onViewer";
import type { Cache } from "../domain/models/file/cache";
import type { FileManager } from "../domain/models/file/fileManager";
import { createFileNavigator } from "../domain/models/file/fileNavigator";
import { initNotification } from "../domain/models/notification/notification";
import { ScrollPercentage2D } from "../domain/models/scroll/scrollPercentage2D";
import { createUserSettings } from "../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../domain/models/viewer/viewerManager";
import { createZoomPercentage, ZOOM_PERCENTAGE_MIN } from "../domain/models/zoom/zoomPercentage";
import { BlobCache } from "../infrastructure/file/blobCache";
import { NullFileManager } from "../infrastructure/file/nullFileManager";
import { ImageViewerManager } from "../infrastructure/viewer/imageViewerManager";

export const bookmarkIndexAtom = atom(createBookmarkIndex());
export const cacheAtom = atom<Cache>(() => new BlobCache());
export const chevronMarkAtom = atom(createChevronMark("none"));
export const fileManagerAtom = atom<FileManager>(new NullFileManager());
export const fileNavigatorAtom = atom(createFileNavigator(0, 0));
export const imageSizeAtom = atom(createImageSize(0, 0));
export const infoVisibilityAtom = atom(createInfoVisibility("visible"));
export const isImageWiderThanViewerAtom = atom(createIsImageWiderThanViewer(undefined));
export const isLandscapeAtom = atom(createIsLandscape(false));
export const isLoadingAtom = atom(createIsLoading(false));
export const isOpenSideMenuAtom = atom(createIsOpenSideMenu(false));
export const isUserScrolledAtom = atom(createIsUserScrolled(false));
export const notificationAtom = atom(initNotification());
export const onInvertFilterAtom = atom(createOnInvertFilter(false));
export const onSharpeningFilterAtom = atom(createOnSharpeningFilter(false));
export const onViewerAtom = atom(createOnViewer(false));
export const scrollPercentage2DAtom = atom(() => new ScrollPercentage2D());
export const viewerManagerAtom = atom<ViewerManager>(() => new ImageViewerManager());
export const zoomPercentageAtom = atom(createZoomPercentage(ZOOM_PERCENTAGE_MIN));

export const Atom = {
  userSettings: atom(createUserSettings()),
} as const;

export const UserSettingsAtom = {
  bookFormat: selectAtom(Atom.userSettings, (u) => u.bookFormat),
  contentFit: selectAtom(Atom.userSettings, (u) => u.contentFit),
  displayMode: selectAtom(Atom.userSettings, (u) => u.displayMode),
  historyList: selectAtom(Atom.userSettings, (u) => u.historyList),
  isSafeAreaEnabled: selectAtom(Atom.userSettings, (u) => u.isSafeAreaEnabled),
  isSmoothScrollEnabled: selectAtom(Atom.userSettings, (u) => u.isSmoothScrollEnabled),
  longPressRecognitionTime: selectAtom(Atom.userSettings, (u) => u.longPressRecognitionTime),
  menuOpacity: selectAtom(Atom.userSettings, (u) => u.menuOpacity),
  safeAreaLength: selectAtom(Atom.userSettings, (u) => u.safeAreaLength),
  scrollSpeed: selectAtom(Atom.userSettings, (u) => u.scrollSpeed),
  scrollStepCount: selectAtom(Atom.userSettings, (u) => u.scrollStepCount),
  sharpeningFilterStrength: selectAtom(Atom.userSettings, (u) => u.sharpeningFilterStrength),
  shouldAdvance: selectAtom(Atom.userSettings, (u) => u.shouldAdvance),
  shouldPreload: selectAtom(Atom.userSettings, (u) => u.shouldPreload),
  shouldShowBookmarkButton: selectAtom(Atom.userSettings, (u) => u.shouldShowBookmarkButton),
  shouldShowFullscreenButton: selectAtom(Atom.userSettings, (u) => u.shouldShowFullscreenButton),
  shouldShowInvertButton: selectAtom(Atom.userSettings, (u) => u.shouldShowInvertButton),
  shouldShowProgressBar: selectAtom(Atom.userSettings, (u) => u.shouldShowProgressBar),
  shouldShowSharpeningFilterButton: selectAtom(
    Atom.userSettings,
    (u) => u.shouldShowSharpeningFilterButton,
  ),
  tapAreaSize: selectAtom(Atom.userSettings, (u) => u.tapAreaSize),
  zoomStep: selectAtom(Atom.userSettings, (u) => u.zoomStep),
} as const;
