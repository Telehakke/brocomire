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
import { createOnInvertLightness } from "../application/appState/onInvertLightness";
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
export const onInvertLightnessAtom = atom(createOnInvertLightness(false));
export const onSharpeningFilterAtom = atom(createOnSharpeningFilter(false));
export const onViewerAtom = atom(createOnViewer(false));
export const scrollPercentage2DAtom = atom(() => new ScrollPercentage2D());
export const viewerManagerAtom = atom<ViewerManager>(() => new ImageViewerManager());
export const zoomPercentageAtom = atom(createZoomPercentage(ZOOM_PERCENTAGE_MIN));

/* -------------------------------------------------------------------------- */

export const userSettingsAtom = atom(createUserSettings());
export const bookFormatAtom = selectAtom(userSettingsAtom, (u) => u.bookFormat);
export const contentFitAtom = selectAtom(userSettingsAtom, (u) => u.contentFit);
export const displayModeAtom = selectAtom(userSettingsAtom, (u) => u.displayMode);
export const historyListAtom = selectAtom(userSettingsAtom, (u) => u.historyList);
export const isSafeAreaEnabledAtom = selectAtom(userSettingsAtom, (u) => u.isSafeAreaEnabled);
export const isSmoothScrollEnabledAtom = selectAtom(
  userSettingsAtom,
  (u) => u.isSmoothScrollEnabled,
);
export const longPressRecognitionTimeAtom = selectAtom(
  userSettingsAtom,
  (u) => u.longPressRecognitionTime,
);
export const menuOpacityAtom = selectAtom(userSettingsAtom, (u) => u.menuOpacity);
export const safeAreaLengthAtom = selectAtom(userSettingsAtom, (u) => u.safeAreaLength);
export const scrollSpeedAtom = selectAtom(userSettingsAtom, (u) => u.scrollSpeed);
export const scrollStepCountAtom = selectAtom(userSettingsAtom, (u) => u.scrollStepCount);
export const sharpeningFilterStrengthAtom = selectAtom(
  userSettingsAtom,
  (u) => u.sharpeningFilterStrength,
);
export const shouldAdvanceAtom = selectAtom(userSettingsAtom, (u) => u.shouldAdvance);
export const shouldPreloadAtom = selectAtom(userSettingsAtom, (u) => u.shouldPreload);
export const shouldShowBookmarkButtonAtom = selectAtom(
  userSettingsAtom,
  (u) => u.shouldShowBookmarkButton,
);
export const shouldShowFullscreenButtonAtom = selectAtom(
  userSettingsAtom,
  (u) => u.shouldShowFullscreenButton,
);
export const shouldShowInvertButtonAtom = selectAtom(
  userSettingsAtom,
  (u) => u.shouldShowInvertButton,
);
export const shouldShowInvertLightnessButtonAtom = selectAtom(
  userSettingsAtom,
  (u) => u.shouldShowInvertLightnessButton,
);
export const shouldShowProgressBarAtom = selectAtom(
  userSettingsAtom,
  (u) => u.shouldShowProgressBar,
);
export const shouldShowSharpeningFilterButtonAtom = selectAtom(
  userSettingsAtom,
  (u) => u.shouldShowSharpeningFilterButton,
);
export const tapAreaSizeAtom = selectAtom(userSettingsAtom, (u) => u.tapAreaSize);
export const zoomStepAtom = selectAtom(userSettingsAtom, (u) => u.zoomStep);
