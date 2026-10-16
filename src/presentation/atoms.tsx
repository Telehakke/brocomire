import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import * as BookmarkIndex from "../application/appState/bookmarkIndex";
import * as ChevronMark from "../application/appState/chevronMark";
import * as ImageSize from "../application/appState/imageSize";
import * as InfoVisibility from "../application/appState/infoVisibility";
import * as IsImageWiderThanViewer from "../application/appState/isImageWiderThanViewer";
import * as IsLandscape from "../application/appState/isLandscape";
import * as IsLoading from "../application/appState/isLoading";
import * as IsOpenSideMenu from "../application/appState/isOpenSideMenu";
import * as IsUserScrolled from "../application/appState/isUserScrolled";
import * as OnInvertFilter from "../application/appState/onInvertFilter";
import * as OnSharpeningFilter from "../application/appState/onSharpeningFilter";
import * as OnViewer from "../application/appState/onViewer";
import type { Cache } from "../domain/models/file/cache";
import type { FileManager } from "../domain/models/file/fileManager";
import * as FileNavigator from "../domain/models/file/fileNavigator";
import * as Notification from "../domain/models/notification/notification";
import { ScrollPercentage2D } from "../domain/models/scroll/scrollPercentage2D";
import * as UserSettings from "../domain/models/userSettings/userSettings";
import type { ViewerManager } from "../domain/models/viewer/viewerManager";
import * as ZoomPercentage from "../domain/models/zoom/zoomPercentage";
import { BlobCache } from "../infrastructure/file/blobCache";
import { NullFileManager } from "../infrastructure/file/nullFileManager";
import { ImageViewerManager } from "../infrastructure/viewer/imageViewerManager";

export const bookmarkIndexAtom = atom(BookmarkIndex.create());
export const cacheAtom = atom<Cache>(() => new BlobCache());
export const chevronMarkAtom = atom(ChevronMark.create("none"));
export const fileManagerAtom = atom<FileManager>(new NullFileManager());
export const fileNavigatorAtom = atom(FileNavigator.create({ currentIndex: 0, fileLength: 0 }));
export const imageSizeAtom = atom(ImageSize.create({ width: 0, height: 0 }));
export const infoVisibilityAtom = atom(InfoVisibility.create("visible"));
export const isImageWiderThanViewerAtom = atom(IsImageWiderThanViewer.create(undefined));
export const isLandscapeAtom = atom(IsLandscape.create(false));
export const isLoadingAtom = atom(IsLoading.create(false));
export const isOpenSideMenuAtom = atom(IsOpenSideMenu.create(false));
export const isUserScrolledAtom = atom(IsUserScrolled.create(false));
export const notificationAtom = atom(Notification.init());
export const onInvertFilterAtom = atom(OnInvertFilter.create(false));
export const onSharpeningFilterAtom = atom(OnSharpeningFilter.create(false));
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
