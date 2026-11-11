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
  createShouldShowInvertLightnessButton,
  type ShouldShowInvertLightnessButton,
} from "./valueObjects/shouldShowInvertLightnessButton";
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
  shouldShowInvertLightnessButton: ShouldShowInvertLightnessButton;
  shouldShowProgressBar: ShouldShowProgressBar;
  shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton;
  tapAreaSize: TapAreaSize;
  zoomStep: ZoomStep;
}>;

export type UserSettingsStore = {
  get(): UserSettings;
  set(value: UserSettings): void;
};
export type UserSettingsGetter = () => UserSettings;
export type UserSettingsSetter = (value: UserSettings) => void;

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
      shouldShowInvertLightnessButton: createShouldShowInvertLightnessButton(),
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
    shouldShowInvertLightnessButton: createShouldShowInvertLightnessButton(
      v.shouldShowInvertLightnessButton,
    ),
    shouldShowProgressBar: createShouldShowProgressBar(v.shouldShowProgressBar),
    shouldShowSharpeningFilterButton: createShouldShowSharpeningFilterButton(
      v.shouldShowSharpeningFilterButton,
    ),
    tapAreaSize: createTapAreaSize(v.tapAreaSize.width, v.tapAreaSize.height),
    zoomStep: createZoomStep(v.zoomStep),
  };
};

export const createUserSettingsStore = (
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
  const userSettings: UserSettings = { ...input, bookFormat };
  repository.save(userSettings);
  return userSettings;
};

export const setContentFit = (
  input: UserSettings,
  contentFit: ContentFit,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, contentFit };
  repository.save(userSettings);
  return userSettings;
};

export const setDisplayMode = (
  input: UserSettings,
  displayMode: DisplayMode,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, displayMode };
  repository.save(userSettings);
  return userSettings;
};

export const setHistoryList = (
  input: UserSettings,
  historyList: HistoryList,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, historyList };
  repository.save(userSettings);
  return userSettings;
};

export const setIsSafeAreaEnabled = (
  input: UserSettings,
  isSafeAreaEnabled: IsSafeAreaEnabled,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, isSafeAreaEnabled };
  repository.save(userSettings);
  return userSettings;
};

export const setIsSmoothScrollEnabled = (
  input: UserSettings,
  isSmoothScrollEnabled: IsSmoothScrollEnabled,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, isSmoothScrollEnabled };
  repository.save(userSettings);
  return userSettings;
};

export const setLongPressRecognitionTime = (
  input: UserSettings,
  longPressRecognitionTime: LongPressRecognitionTime,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, longPressRecognitionTime };
  repository.save(userSettings);
  return userSettings;
};

export const setMenuOpacity = (
  input: UserSettings,
  menuOpacity: MenuOpacity,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, menuOpacity };
  repository.save(userSettings);
  return userSettings;
};

export const setSafeAreaLength = (
  input: UserSettings,
  safeAreaLength: SafeAreaLength,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, safeAreaLength };
  repository.save(userSettings);
  return userSettings;
};

export const setScrollSpeed = (
  input: UserSettings,
  scrollSpeed: ScrollSpeed,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, scrollSpeed };
  repository.save(userSettings);
  return userSettings;
};

export const setScrollStepCount = (
  input: UserSettings,
  scrollStepCount: ScrollStepCount,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, scrollStepCount };
  repository.save(userSettings);
  return userSettings;
};

export const setSharpeningFilterStrength = (
  input: UserSettings,
  sharpeningFilterStrength: SharpeningFilterStrength,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, sharpeningFilterStrength };
  repository.save(userSettings);
  return userSettings;
};

export const setShouldAdvance = (
  input: UserSettings,
  shouldAdvance: ShouldAdvance,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, shouldAdvance };
  repository.save(userSettings);
  return userSettings;
};

export const setShouldPreload = (
  input: UserSettings,
  shouldPreload: ShouldPreload,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, shouldPreload };
  repository.save(userSettings);
  return userSettings;
};

export const setShouldShowBookmarkButton = (
  input: UserSettings,
  shouldShowBookmarkButton: ShouldShowBookmarkButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, shouldShowBookmarkButton };
  repository.save(userSettings);
  return userSettings;
};

export const setShouldShowFullscreenButton = (
  input: UserSettings,
  shouldShowFullscreenButton: ShouldShowFullscreenButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSetting: UserSettings = { ...input, shouldShowFullscreenButton };
  repository.save(userSetting);
  return userSetting;
};

export const setShouldShowInvertButton = (
  input: UserSettings,
  shouldShowInvertButton: ShouldShowInvertButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, shouldShowInvertButton };
  repository.save(userSettings);
  return userSettings;
};

export const setShouldShowInvertLightnessButton = (
  input: UserSettings,
  shouldShowInvertLightnessButton: ShouldShowInvertLightnessButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSetting: UserSettings = { ...input, shouldShowInvertLightnessButton };
  repository.save(userSetting);
  return userSetting;
};

export const setShouldShowProgressBar = (
  input: UserSettings,
  shouldShowProgressBar: ShouldShowProgressBar,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, shouldShowProgressBar };
  repository.save(userSettings);
  return userSettings;
};

export const setShouldShowSharpeningFilterButton = (
  input: UserSettings,
  shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, shouldShowSharpeningFilterButton };
  repository.save(userSettings);
  return userSettings;
};

export const setTapAreaSize = (
  input: UserSettings,
  tapAreaSize: TapAreaSize,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, tapAreaSize };
  repository.save(userSettings);
  return userSettings;
};

export const setZoomStep = (
  input: UserSettings,
  zoomStep: ZoomStep,
  repository: UserSettingsRepository,
): UserSettings => {
  const userSettings: UserSettings = { ...input, zoomStep };
  repository.save(userSettings);
  return userSettings;
};
