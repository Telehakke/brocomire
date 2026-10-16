import { isNotNull } from "../utils/isNotNull";
import * as HistoryList from "./history/historyList";
import type { UserSettingsRepository } from "./userSettingsRepository";
import * as BookFormat from "./valueObjects/bookFormat";
import * as ContentFit from "./valueObjects/contentFit";
import * as DisplayMode from "./valueObjects/displayMode";
import * as IsSafeAreaEnabled from "./valueObjects/isSafeAreaEnabled";
import * as IsSmoothScrollEnabled from "./valueObjects/isSmoothScrollEnabled";
import * as LongPressRecognitionTime from "./valueObjects/longPressRecognitionTime";
import * as SafeAreaLength from "./valueObjects/safeAreaLength";
import * as ScrollSpeed from "./valueObjects/scrollSpeed";
import * as ScrollStepCount from "./valueObjects/scrollStepCount";
import * as SharpeningFilterStrength from "./valueObjects/sharpeningFilterStrength";
import * as ShouldAdvance from "./valueObjects/shouldAdvance";
import * as ShouldPreload from "./valueObjects/shouldPreload";
import * as ShouldShowBookmarkButton from "./valueObjects/shouldShowBookmarkButton";
import * as ShouldShowFullscreenButton from "./valueObjects/shouldShowFullscreenButton";
import * as ShouldShowInvertButton from "./valueObjects/shouldShowInvertButton";
import * as ShouldShowProgressBar from "./valueObjects/shouldShowProgressBar";
import * as ShouldShowSharpeningFilterButton from "./valueObjects/shouldShowSharpeningFilterButton";
import * as TapAreaSize from "./valueObjects/tapAreaSize";
import * as ZoomStep from "./valueObjects/zoomStep";

type UserSettingsType = Readonly<{
  bookFormat: BookFormat.BookFormat;
  contentFit: ContentFit.ContentFit;
  displayMode: DisplayMode.DisplayMode;
  historyList: HistoryList.HistoryList;
  isSafeAreaEnabled: IsSafeAreaEnabled.IsSafeAreaEnabled;
  isSmoothScrollEnabled: IsSmoothScrollEnabled.IsSmoothScrollEnabled;
  longPressRecognitionTime: LongPressRecognitionTime.LongPressRecognitionTime;
  safeAreaLength: SafeAreaLength.SafeAreaLength;
  scrollSpeed: ScrollSpeed.ScrollSpeed;
  scrollStepCount: ScrollStepCount.ScrollStepCount;
  sharpeningFilterStrength: SharpeningFilterStrength.SharpeningFilterStrength;
  shouldAdvance: ShouldAdvance.ShouldAdvance;
  shouldPreload: ShouldPreload.ShouldPreload;
  shouldShowBookmarkButton: ShouldShowBookmarkButton.ShouldShowBookmarkButton;
  shouldShowFullscreenButton: ShouldShowFullscreenButton.ShouldShowFullscreenButton;
  shouldShowInvertButton: ShouldShowInvertButton.ShouldShowInvertButton;
  shouldShowProgressBar: ShouldShowProgressBar.ShouldShowProgressBar;
  shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton.ShouldShowSharpeningFilterButton;
  tapAreaSize: TapAreaSize.TapAreaSize;
  zoomStep: ZoomStep.ZoomStep;
}>;

declare const UserSettingsBrand: unique symbol;

export type UserSettings = UserSettingsType & { [UserSettingsBrand]: unknown };

export type UserSettingsGetter = () => UserSettings;

/* -------------------------------------------------------------------------- */

export type UserSettingsStore = {
  get(): UserSettings;
  set(value: UserSettings): void;
};

/* -------------------------------------------------------------------------- */

export const createSafe = (value?: unknown): UserSettings => {
  if (!isNotNull(value))
    return create({
      bookFormat: BookFormat.createSafe(),
      contentFit: ContentFit.createSafe(),
      displayMode: DisplayMode.createSafe(),
      historyList: HistoryList.createSafe(),
      isSafeAreaEnabled: IsSafeAreaEnabled.createSafe(),
      isSmoothScrollEnabled: IsSmoothScrollEnabled.createSafe(),
      longPressRecognitionTime: LongPressRecognitionTime.createSafe(),
      safeAreaLength: SafeAreaLength.createSafe(),
      scrollSpeed: ScrollSpeed.createSafe(),
      scrollStepCount: ScrollStepCount.createSafe(),
      sharpeningFilterStrength: SharpeningFilterStrength.createSafe(),
      shouldAdvance: ShouldAdvance.createSafe(),
      shouldPreload: ShouldPreload.createSafe(),
      shouldShowBookmarkButton: ShouldShowBookmarkButton.createSafe(),
      shouldShowFullscreenButton: ShouldShowFullscreenButton.createSafe(),
      shouldShowInvertButton: ShouldShowInvertButton.createSafe(),
      shouldShowProgressBar: ShouldShowProgressBar.createSafe(),
      shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton.createSafe(),
      tapAreaSize: TapAreaSize.createSafe(),
      zoomStep: ZoomStep.createSafe(),
    });

  const v = value as UserSettingsType;
  return create({
    bookFormat: BookFormat.createSafe(v.bookFormat),
    contentFit: ContentFit.createSafe(v.contentFit),
    displayMode: DisplayMode.createSafe(v.displayMode),
    historyList: HistoryList.createSafe(v.historyList),
    isSafeAreaEnabled: IsSafeAreaEnabled.createSafe(v.isSafeAreaEnabled),
    isSmoothScrollEnabled: IsSmoothScrollEnabled.createSafe(v.isSmoothScrollEnabled),
    longPressRecognitionTime: LongPressRecognitionTime.createSafe(v.longPressRecognitionTime),
    safeAreaLength: SafeAreaLength.createSafe(v.safeAreaLength),
    scrollSpeed: ScrollSpeed.createSafe(v.scrollSpeed),
    scrollStepCount: ScrollStepCount.createSafe(v.scrollStepCount),
    sharpeningFilterStrength: SharpeningFilterStrength.createSafe(v.sharpeningFilterStrength),
    shouldAdvance: ShouldAdvance.createSafe(v.shouldAdvance),
    shouldPreload: ShouldPreload.createSafe(v.shouldPreload),
    shouldShowBookmarkButton: ShouldShowBookmarkButton.createSafe(v.shouldShowBookmarkButton),
    shouldShowFullscreenButton: ShouldShowFullscreenButton.createSafe(v.shouldShowFullscreenButton),
    shouldShowInvertButton: ShouldShowInvertButton.createSafe(v.shouldShowInvertButton),
    shouldShowProgressBar: ShouldShowProgressBar.createSafe(v.shouldShowProgressBar),
    shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton.createSafe(
      v.shouldShowSharpeningFilterButton,
    ),
    tapAreaSize: TapAreaSize.createSafe(v.tapAreaSize),
    zoomStep: ZoomStep.createSafe(v.zoomStep),
  });
};

export const equals = (v1: UserSettings, v2: UserSettings): boolean => {
  return (
    BookFormat.equals(v1.bookFormat, v2.bookFormat) &&
    ContentFit.equals(v1.contentFit, v2.contentFit) &&
    DisplayMode.equals(v1.displayMode, v2.displayMode) &&
    HistoryList.equals(v1.historyList, v2.historyList) &&
    IsSafeAreaEnabled.equals(v1.isSafeAreaEnabled, v2.isSafeAreaEnabled) &&
    IsSmoothScrollEnabled.equals(v1.isSmoothScrollEnabled, v2.isSmoothScrollEnabled) &&
    LongPressRecognitionTime.equals(v1.longPressRecognitionTime, v2.longPressRecognitionTime) &&
    SafeAreaLength.equals(v1.safeAreaLength, v2.safeAreaLength) &&
    ScrollSpeed.equals(v1.scrollSpeed, v2.scrollSpeed) &&
    ScrollStepCount.equals(v1.scrollStepCount, v2.scrollStepCount) &&
    SharpeningFilterStrength.equals(v1.sharpeningFilterStrength, v2.sharpeningFilterStrength) &&
    ShouldAdvance.equals(v1.shouldAdvance, v2.shouldAdvance) &&
    ShouldPreload.equals(v1.shouldPreload, v2.shouldPreload) &&
    ShouldShowBookmarkButton.equals(v1.shouldShowBookmarkButton, v2.shouldShowBookmarkButton) &&
    ShouldShowFullscreenButton.equals(
      v1.shouldShowFullscreenButton,
      v2.shouldShowFullscreenButton,
    ) &&
    ShouldShowInvertButton.equals(v1.shouldShowInvertButton, v2.shouldShowInvertButton) &&
    ShouldShowSharpeningFilterButton.equals(
      v1.shouldShowSharpeningFilterButton,
      v2.shouldShowSharpeningFilterButton,
    ) &&
    TapAreaSize.equals(v1.tapAreaSize, v2.tapAreaSize) &&
    ZoomStep.equals(v1.zoomStep, v2.zoomStep)
  );
};

export const getStore = (
  getter: () => UserSettings,
  setter: (value: UserSettings) => void,
): UserSettingsStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};

export const setBookFormat = (
  input: UserSettings,
  bookFormat: BookFormat.BookFormat,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { bookFormat });
  repository.save(result);
  return result;
};

export const setContentFit = (
  input: UserSettings,
  contentFit: ContentFit.ContentFit,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { contentFit });
  repository.save(result);
  return result;
};

export const setDisplayMode = (
  input: UserSettings,
  displayMode: DisplayMode.DisplayMode,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { displayMode });
  repository.save(result);
  return result;
};

export const setHistoryList = (
  input: UserSettings,
  historyList: HistoryList.HistoryList,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { historyList });
  repository.save(result);
  return result;
};

export const setIsSafeAreaEnabled = (
  input: UserSettings,
  isSafeAreaEnabled: IsSafeAreaEnabled.IsSafeAreaEnabled,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { isSafeAreaEnabled });
  repository.save(result);
  return result;
};

export const setIsSmoothScrollEnabled = (
  input: UserSettings,
  isSmoothScrollEnabled: IsSmoothScrollEnabled.IsSmoothScrollEnabled,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { isSmoothScrollEnabled });
  repository.save(result);
  return result;
};

export const setLongPressRecognitionTime = (
  input: UserSettings,
  longPressRecognitionTime: LongPressRecognitionTime.LongPressRecognitionTime,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { longPressRecognitionTime });
  repository.save(result);
  return result;
};

export const setSafeAreaLength = (
  input: UserSettings,
  safeAreaLength: SafeAreaLength.SafeAreaLength,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { safeAreaLength });
  repository.save(result);
  return result;
};

export const setScrollSpeed = (
  input: UserSettings,
  scrollSpeed: ScrollSpeed.ScrollSpeed,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { scrollSpeed });
  repository.save(result);
  return result;
};

export const setScrollStepCount = (
  input: UserSettings,
  scrollStepCount: ScrollStepCount.ScrollStepCount,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { scrollStepCount });
  repository.save(result);
  return result;
};

export const setSharpeningFilterStrength = (
  input: UserSettings,
  sharpeningFilterStrength: SharpeningFilterStrength.SharpeningFilterStrength,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { sharpeningFilterStrength });
  repository.save(result);
  return result;
};

export const setShouldAdvance = (
  input: UserSettings,
  shouldAdvance: ShouldAdvance.ShouldAdvance,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldAdvance });
  repository.save(result);
  return result;
};

export const setShouldPreload = (
  input: UserSettings,
  shouldPreload: ShouldPreload.ShouldPreload,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldPreload });
  repository.save(result);
  return result;
};

export const setShouldShowBookmarkButton = (
  input: UserSettings,
  shouldShowBookmarkButton: ShouldShowBookmarkButton.ShouldShowBookmarkButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowBookmarkButton });
  repository.save(result);
  return result;
};

export const setShouldShowFullscreenButton = (
  input: UserSettings,
  shouldShowFullscreenButton: ShouldShowFullscreenButton.ShouldShowFullscreenButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowFullscreenButton });
  repository.save(result);
  return result;
};

export const setShouldShowInvertButton = (
  input: UserSettings,
  shouldShowInvertButton: ShouldShowInvertButton.ShouldShowInvertButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowInvertButton });
  repository.save(result);
  return result;
};

export const setShouldShowProgressBar = (
  input: UserSettings,
  shouldShowProgressBar: ShouldShowProgressBar.ShouldShowProgressBar,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowProgressBar });
  repository.save(result);
  return result;
};

export const setShouldShowSharpeningFilterButton = (
  input: UserSettings,
  shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton.ShouldShowSharpeningFilterButton,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { shouldShowSharpeningFilterButton });
  repository.save(result);
  return result;
};

export const setTapAreaSize = (
  input: UserSettings,
  tapAreaSize: TapAreaSize.TapAreaSize,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { tapAreaSize });
  repository.save(result);
  return result;
};

export const setZoomStep = (
  input: UserSettings,
  zoomStep: ZoomStep.ZoomStep,
  repository: UserSettingsRepository,
): UserSettings => {
  const result = copyWith(input, { zoomStep });
  repository.save(result);
  return result;
};

const create = (value: UserSettingsType): UserSettings => {
  return value as UserSettings;
};

const copyWith = (input: UserSettings, value: Partial<UserSettingsType>): UserSettings => {
  return create({
    bookFormat: value.bookFormat ?? input.bookFormat,
    contentFit: value.contentFit ?? input.contentFit,
    displayMode: value.displayMode ?? input.displayMode,
    historyList: value.historyList ?? input.historyList,
    isSafeAreaEnabled: value.isSafeAreaEnabled ?? input.isSafeAreaEnabled,
    isSmoothScrollEnabled: value.isSmoothScrollEnabled ?? input.isSmoothScrollEnabled,
    longPressRecognitionTime: value.longPressRecognitionTime ?? input.longPressRecognitionTime,
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
  });
};
