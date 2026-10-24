import { isNotNull } from "../utils/isNotNull";
import { createHistoryList, type HistoryList } from "./history/historyList";
import type { UserSettingsRepository } from "./userSettingsRepository";
import { createBookFormat, type BookFormat } from "./valueObjects/bookFormat";
import { createContentFit, type ContentFit } from "./valueObjects/contentFit";
import { createDisplayMode, type DisplayMode } from "./valueObjects/displayMode";
import { createIsSafeAreaEnabled, type IsSafeAreaEnabled } from "./valueObjects/isSafeAreaEnabled";
import {
  createIsSmoothScrollEnabled,
  type IsSmoothScrollEnabled,
} from "./valueObjects/isSmoothScrollEnabled";
import {
  createLongPressRecognitionTime,
  type LongPressRecognitionTime,
} from "./valueObjects/longPressRecognitionTime";
import { createMenuOpacity, type MenuOpacity } from "./valueObjects/menuOpacity";
import { createSafeAreaLength, type SafeAreaLength } from "./valueObjects/safeAreaLength";
import { createScrollSpeed, type ScrollSpeed } from "./valueObjects/scrollSpeed";
import { createScrollStepCount, type ScrollStepCount } from "./valueObjects/scrollStepCount";
import {
  createSharpeningFilterStrength,
  type SharpeningFilterStrength,
} from "./valueObjects/sharpeningFilterStrength";
import { createShouldAdvance, type ShouldAdvance } from "./valueObjects/shouldAdvance";
import { createShouldPreload, type ShouldPreload } from "./valueObjects/shouldPreload";
import {
  createShouldShowBookmarkButton,
  type ShouldShowBookmarkButton,
} from "./valueObjects/shouldShowBookmarkButton";
import {
  createShouldShowFullscreenButton,
  type ShouldShowFullscreenButton,
} from "./valueObjects/shouldShowFullscreenButton";
import {
  createShouldShowInvertButton,
  type ShouldShowInvertButton,
} from "./valueObjects/shouldShowInvertButton";
import {
  createShouldShowProgressBar,
  type ShouldShowProgressBar,
} from "./valueObjects/shouldShowProgressBar";
import {
  createShouldShowSharpeningFilterButton,
  type ShouldShowSharpeningFilterButton,
} from "./valueObjects/shouldShowSharpeningFilterButton";
import { createTapAreaSize, type TapAreaSize } from "./valueObjects/tapAreaSize";
import { createZoomStep, type ZoomStep } from "./valueObjects/zoomStep";

export type UserSettings = Readonly<{
  bookFormat: BookFormat;
  contentFit: ContentFit;
  displayMode: DisplayMode;
  historyList: HistoryList;
  isSafeAreaEnabled: IsSafeAreaEnabled;
  isSmoothScrollEnabled: IsSmoothScrollEnabled;
  longPressRecognitionTime: LongPressRecognitionTime;
  menuOpacity: MenuOpacity;
  safeAreaLength: SafeAreaLength;
  scrollSpeed: ScrollSpeed;
  scrollStepCount: ScrollStepCount;
  sharpeningFilterStrength: SharpeningFilterStrength;
  shouldAdvance: ShouldAdvance;
  shouldPreload: ShouldPreload;
  shouldShowBookmarkButton: ShouldShowBookmarkButton;
  shouldShowFullscreenButton: ShouldShowFullscreenButton;
  shouldShowInvertButton: ShouldShowInvertButton;
  shouldShowProgressBar: ShouldShowProgressBar;
  shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton;
  tapAreaSize: TapAreaSize;
  zoomStep: ZoomStep;
}>;

export type UserSettingsGetter = () => UserSettings;

export type UserSettingsStore = {
  get(): UserSettings;
  set(value: UserSettings): void;
};

/* -------------------------------------------------------------------------- */

export const createUserSettings = (value?: unknown): UserSettings => {
  if (!isNotNull(value))
    return {
      bookFormat: createBookFormat(),
      contentFit: createContentFit(),
      displayMode: createDisplayMode(),
      historyList: createHistoryList(),
      isSafeAreaEnabled: createIsSafeAreaEnabled(),
      isSmoothScrollEnabled: createIsSmoothScrollEnabled(),
      longPressRecognitionTime: createLongPressRecognitionTime(),
      menuOpacity: createMenuOpacity(),
      safeAreaLength: createSafeAreaLength(),
      scrollSpeed: createScrollSpeed(),
      scrollStepCount: createScrollStepCount(),
      sharpeningFilterStrength: createSharpeningFilterStrength(),
      shouldAdvance: createShouldAdvance(),
      shouldPreload: createShouldPreload(),
      shouldShowBookmarkButton: createShouldShowBookmarkButton(),
      shouldShowFullscreenButton: createShouldShowFullscreenButton(),
      shouldShowInvertButton: createShouldShowInvertButton(),
      shouldShowProgressBar: createShouldShowProgressBar(),
      shouldShowSharpeningFilterButton: createShouldShowSharpeningFilterButton(),
      tapAreaSize: createTapAreaSize(),
      zoomStep: createZoomStep(),
    };

  const v = value as UserSettings;
  return {
    bookFormat: createBookFormat(v.bookFormat),
    contentFit: createContentFit(v.contentFit),
    displayMode: createDisplayMode(v.displayMode),
    historyList: createHistoryList(v.historyList),
    isSafeAreaEnabled: createIsSafeAreaEnabled(v.isSafeAreaEnabled),
    isSmoothScrollEnabled: createIsSmoothScrollEnabled(v.isSmoothScrollEnabled),
    longPressRecognitionTime: createLongPressRecognitionTime(v.longPressRecognitionTime),
    menuOpacity: createMenuOpacity(v.menuOpacity),
    safeAreaLength: createSafeAreaLength(v.safeAreaLength),
    scrollSpeed: createScrollSpeed(v.scrollSpeed),
    scrollStepCount: createScrollStepCount(v.scrollStepCount),
    sharpeningFilterStrength: createSharpeningFilterStrength(v.sharpeningFilterStrength),
    shouldAdvance: createShouldAdvance(v.shouldAdvance),
    shouldPreload: createShouldPreload(v.shouldPreload),
    shouldShowBookmarkButton: createShouldShowBookmarkButton(v.shouldShowBookmarkButton),
    shouldShowFullscreenButton: createShouldShowFullscreenButton(v.shouldShowFullscreenButton),
    shouldShowInvertButton: createShouldShowInvertButton(v.shouldShowInvertButton),
    shouldShowProgressBar: createShouldShowProgressBar(v.shouldShowProgressBar),
    shouldShowSharpeningFilterButton: createShouldShowSharpeningFilterButton(
      v.shouldShowSharpeningFilterButton,
    ),
    tapAreaSize: createTapAreaSize(v.tapAreaSize.width, v.tapAreaSize.height),
    zoomStep: createZoomStep(v.zoomStep),
  };
};

export const getUserSettingsStore = (
  getter: () => UserSettings,
  setter: (value: UserSettings) => void,
): UserSettingsStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

export const setBookFormat = (
  input: UserSettings,
  bookFormat: BookFormat,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { bookFormat });
  repository.save(result);
  return result;
};

export const setContentFit = (
  input: UserSettings,
  contentFit: ContentFit,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { contentFit });
  repository.save(result);
  return result;
};

export const setDisplayMode = (
  input: UserSettings,
  displayMode: DisplayMode,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { displayMode });
  repository.save(result);
  return result;
};

export const setHistoryList = (
  input: UserSettings,
  historyList: HistoryList,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { historyList });
  repository.save(result);
  return result;
};

export const setIsSafeAreaEnabled = (
  input: UserSettings,
  isSafeAreaEnabled: IsSafeAreaEnabled,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { isSafeAreaEnabled });
  repository.save(result);
  return result;
};

export const setIsSmoothScrollEnabled = (
  input: UserSettings,
  isSmoothScrollEnabled: IsSmoothScrollEnabled,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { isSmoothScrollEnabled });
  repository.save(result);
  return result;
};

export const setLongPressRecognitionTime = (
  input: UserSettings,
  longPressRecognitionTime: LongPressRecognitionTime,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { longPressRecognitionTime });
  repository.save(result);
  return result;
};

export const setMenuOpacity = (
  input: UserSettings,
  menuOpacity: MenuOpacity,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { menuOpacity });
  repository.save(result);
  return result;
};

export const setSafeAreaLength = (
  input: UserSettings,
  safeAreaLength: SafeAreaLength,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { safeAreaLength });
  repository.save(result);
  return result;
};

export const setScrollSpeed = (
  input: UserSettings,
  scrollSpeed: ScrollSpeed,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { scrollSpeed });
  repository.save(result);
  return result;
};

export const setScrollStepCount = (
  input: UserSettings,
  scrollStepCount: ScrollStepCount,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { scrollStepCount });
  repository.save(result);
  return result;
};

export const setSharpeningFilterStrength = (
  input: UserSettings,
  sharpeningFilterStrength: SharpeningFilterStrength,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { sharpeningFilterStrength });
  repository.save(result);
  return result;
};

export const setShouldAdvance = (
  input: UserSettings,
  shouldAdvance: ShouldAdvance,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldAdvance });
  repository.save(result);
  return result;
};

export const setShouldPreload = (
  input: UserSettings,
  shouldPreload: ShouldPreload,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldPreload });
  repository.save(result);
  return result;
};

export const setShouldShowBookmarkButton = (
  input: UserSettings,
  shouldShowBookmarkButton: ShouldShowBookmarkButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowBookmarkButton });
  repository.save(result);
  return result;
};

export const setShouldShowFullscreenButton = (
  input: UserSettings,
  shouldShowFullscreenButton: ShouldShowFullscreenButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowFullscreenButton });
  repository.save(result);
  return result;
};

export const setShouldShowInvertButton = (
  input: UserSettings,
  shouldShowInvertButton: ShouldShowInvertButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowInvertButton });
  repository.save(result);
  return result;
};

export const setShouldShowProgressBar = (
  input: UserSettings,
  shouldShowProgressBar: ShouldShowProgressBar,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowProgressBar });
  repository.save(result);
  return result;
};

export const setShouldShowSharpeningFilterButton = (
  input: UserSettings,
  shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowSharpeningFilterButton });
  repository.save(result);
  return result;
};

export const setTapAreaSize = (
  input: UserSettings,
  tapAreaSize: TapAreaSize,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { tapAreaSize });
  repository.save(result);
  return result;
};

export const setZoomStep = (
  input: UserSettings,
  zoomStep: ZoomStep,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { zoomStep });
  repository.save(result);
  return result;
};

/* -------------------------------------------------------------------------- */

const copyWith = (input: UserSettings, value: Partial<UserSettings>): UserSettings => {
  return {
    bookFormat: value.bookFormat ?? input.bookFormat,
    contentFit: value.contentFit ?? input.contentFit,
    displayMode: value.displayMode ?? input.displayMode,
    historyList: value.historyList ?? input.historyList,
    isSafeAreaEnabled: value.isSafeAreaEnabled ?? input.isSafeAreaEnabled,
    isSmoothScrollEnabled: value.isSmoothScrollEnabled ?? input.isSmoothScrollEnabled,
    longPressRecognitionTime: value.longPressRecognitionTime ?? input.longPressRecognitionTime,
    menuOpacity: value.menuOpacity ?? input.menuOpacity,
    safeAreaLength: value.safeAreaLength ?? input.safeAreaLength,
    scrollSpeed: value.scrollSpeed ?? input.scrollSpeed,
    scrollStepCount: value.scrollStepCount ?? input.scrollStepCount,
    sharpeningFilterStrength: value.sharpeningFilterStrength ?? input.sharpeningFilterStrength,
    shouldAdvance: value.shouldAdvance ?? input.shouldAdvance,
    shouldPreload: value.shouldPreload ?? input.shouldPreload,
    shouldShowBookmarkButton: value.shouldShowBookmarkButton ?? input.shouldShowBookmarkButton,
    shouldShowFullscreenButton:
      value.shouldShowFullscreenButton ?? input.shouldShowFullscreenButton,
    shouldShowInvertButton: value.shouldShowInvertButton ?? input.shouldShowInvertButton,
    shouldShowProgressBar: value.shouldShowProgressBar ?? input.shouldShowProgressBar,
    shouldShowSharpeningFilterButton:
      value.shouldShowSharpeningFilterButton ?? input.shouldShowSharpeningFilterButton,
    tapAreaSize: value.tapAreaSize ?? input.tapAreaSize,
    zoomStep: value.zoomStep ?? input.zoomStep,
  };
};
