import { isNotNull } from "../utils/isNotNull";
import { HistoryList } from "./history/historyList";
import type { UserSettingsRepository } from "./userSettingsRepository";
import { BookFormat } from "./valueObjects/bookFormat";
import { ContentFit } from "./valueObjects/contentFit";
import { DisplayMode } from "./valueObjects/displayMode";
import { IsSafeAreaEnabled } from "./valueObjects/isSafeAreaEnabled";
import { IsSmoothScrollEnabled } from "./valueObjects/isSmoothScrollEnabled";
import { LongPressRecognitionTime } from "./valueObjects/longPressRecognitionTime";
import { SafeAreaLength } from "./valueObjects/safeAreaLength";
import { ScrollSpeed } from "./valueObjects/scrollSpeed";
import { ScrollStepCount } from "./valueObjects/scrollStepCount";
import { SharpeningFilterStrength } from "./valueObjects/sharpeningFilterStrength";
import { ShouldAdvance } from "./valueObjects/shouldAdvance";
import { ShouldPreload } from "./valueObjects/shouldPreload";
import { ShouldShowFullscreenButton } from "./valueObjects/shouldShowFullscreenButton";
import { ShouldShowInvertButton } from "./valueObjects/shouldShowInvertButton";
import { ShouldShowSharpeningFilterButton } from "./valueObjects/shouldShowSharpeningFilterButton";
import { TapAreaSize } from "./valueObjects/tapAreaSize";
import { ZoomStep } from "./valueObjects/zoomStep";

type UserSettingsType = Readonly<{
  bookFormat: BookFormat;
  contentFit: ContentFit;
  displayMode: DisplayMode;
  historyList: HistoryList;
  isSafeAreaEnabled: IsSafeAreaEnabled;
  isSmoothScrollEnabled: IsSmoothScrollEnabled;
  longPressRecognitionTime: LongPressRecognitionTime;
  safeAreaLength: SafeAreaLength;
  scrollSpeed: ScrollSpeed;
  scrollStepCount: ScrollStepCount;
  sharpeningFilterStrength: SharpeningFilterStrength;
  shouldAdvance: ShouldAdvance;
  shouldPreload: ShouldPreload;
  shouldShowFullscreenButton: ShouldShowFullscreenButton;
  shouldShowInvertButton: ShouldShowInvertButton;
  shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton;
  tapAreaSize: TapAreaSize;
  zoomStep: ZoomStep;
}>;

declare const UserSettingsBrand: unique symbol;

export type UserSettings = UserSettingsType & { [UserSettingsBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type UserSettingsStore = {
  get(): UserSettings;

  set(value: UserSettings): void;
};

/* -------------------------------------------------------------------------- */

export const UserSettings = {
  createSafe(value?: unknown): UserSettings {
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
        shouldShowFullscreenButton: ShouldShowFullscreenButton.createSafe(),
        shouldShowInvertButton: ShouldShowInvertButton.createSafe(),
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
      shouldShowFullscreenButton: ShouldShowFullscreenButton.createSafe(
        v.shouldShowFullscreenButton,
      ),
      shouldShowInvertButton: ShouldShowInvertButton.createSafe(v.shouldShowInvertButton),
      shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton.createSafe(
        v.shouldShowSharpeningFilterButton,
      ),
      tapAreaSize: TapAreaSize.createSafe(v.tapAreaSize),
      zoomStep: ZoomStep.createSafe(v.zoomStep),
    });
  },

  equals(v1: UserSettings, v2: UserSettings): boolean {
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
  },

  getStore(getter: () => UserSettings, setter: (value: UserSettings) => void): UserSettingsStore {
    return { get: () => getter(), set: (v) => setter(v) };
  },

  setBookFormat(
    userSettings: UserSettings,
    bookFormat: BookFormat,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { bookFormat });
    repository.save(result);
    return result;
  },

  setContentFit(
    userSettings: UserSettings,
    contentFit: ContentFit,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { contentFit });
    repository.save(result);
    return result;
  },

  setDisplayMode(
    userSettings: UserSettings,
    displayMode: DisplayMode,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { displayMode });
    repository.save(result);
    return result;
  },

  setHistoryList(
    userSettings: UserSettings,
    historyList: HistoryList,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { historyList });
    repository.save(result);
    return result;
  },

  setIsSafeAreaEnabled(
    userSettings: UserSettings,
    isSafeAreaEnabled: IsSafeAreaEnabled,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { isSafeAreaEnabled });
    repository.save(result);
    return result;
  },

  setIsSmoothScrollEnabled(
    userSettings: UserSettings,
    isSmoothScrollEnabled: IsSmoothScrollEnabled,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { isSmoothScrollEnabled });
    repository.save(result);
    return result;
  },

  setLongPressRecognitionTime(
    userSettings: UserSettings,
    longPressRecognitionTime: LongPressRecognitionTime,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { longPressRecognitionTime });
    repository.save(result);
    return result;
  },

  setSafeAreaLength(
    userSettings: UserSettings,
    safeAreaLength: SafeAreaLength,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { safeAreaLength });
    repository.save(result);
    return result;
  },

  setScrollSpeed(
    userSettings: UserSettings,
    scrollSpeed: ScrollSpeed,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { scrollSpeed });
    repository.save(result);
    return result;
  },

  setScrollStepCount(
    userSettings: UserSettings,
    scrollStepCount: ScrollStepCount,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { scrollStepCount });
    repository.save(result);
    return result;
  },

  setSharpeningFilterStrength(
    userSettings: UserSettings,
    sharpeningFilterStrength: SharpeningFilterStrength,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { sharpeningFilterStrength });
    repository.save(result);
    return result;
  },

  setShouldAdvance(
    userSettings: UserSettings,
    shouldAdvance: ShouldAdvance,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { shouldAdvance });
    repository.save(result);
    return result;
  },

  setShouldPreload(
    userSettings: UserSettings,
    shouldPreload: ShouldPreload,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { shouldPreload });
    repository.save(result);
    return result;
  },

  setShouldShowFullscreenButton(
    userSettings: UserSettings,
    shouldShowFullscreenButton: ShouldShowFullscreenButton,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { shouldShowFullscreenButton });
    repository.save(result);
    return result;
  },

  setShouldShowInvertButton(
    userSettings: UserSettings,
    shouldShowInvertButton: ShouldShowInvertButton,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { shouldShowInvertButton });
    repository.save(result);
    return result;
  },

  setShouldShowSharpeningFilterButton(
    userSettings: UserSettings,
    shouldShowSharpeningFilterButton: ShouldShowSharpeningFilterButton,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { shouldShowSharpeningFilterButton });
    repository.save(result);
    return result;
  },

  setTapAreaSize(
    userSettings: UserSettings,
    tapAreaSize: TapAreaSize,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { tapAreaSize });
    repository.save(result);
    return result;
  },

  setZoomStep(
    userSettings: UserSettings,
    zoomStep: ZoomStep,
    repository: UserSettingsRepository,
  ): UserSettings {
    const result = copyWith(userSettings, { zoomStep });
    repository.save(result);
    return result;
  },
} as const;

const create = (value: UserSettingsType): UserSettings => {
  return value as UserSettings;
};

const copyWith = (userSettings: UserSettings, value: Partial<UserSettingsType>): UserSettings => {
  return create({
    bookFormat: value.bookFormat ?? userSettings.bookFormat,
    contentFit: value.contentFit ?? userSettings.contentFit,
    displayMode: value.displayMode ?? userSettings.displayMode,
    historyList: value.historyList ?? userSettings.historyList,
    isSafeAreaEnabled: value.isSafeAreaEnabled ?? userSettings.isSafeAreaEnabled,
    isSmoothScrollEnabled: value.isSmoothScrollEnabled ?? userSettings.isSmoothScrollEnabled,
    longPressRecognitionTime:
      value.longPressRecognitionTime ?? userSettings.longPressRecognitionTime,
    safeAreaLength: value.safeAreaLength ?? userSettings.safeAreaLength,
    scrollSpeed: value.scrollSpeed ?? userSettings.scrollSpeed,
    scrollStepCount: value.scrollStepCount ?? userSettings.scrollStepCount,
    sharpeningFilterStrength:
      value.sharpeningFilterStrength ?? userSettings.sharpeningFilterStrength,
    shouldAdvance: value.shouldAdvance ?? userSettings.shouldAdvance,
    shouldPreload: value.shouldPreload ?? userSettings.shouldPreload,
    shouldShowFullscreenButton:
      value.shouldShowFullscreenButton ?? userSettings.shouldShowFullscreenButton,
    shouldShowInvertButton: value.shouldShowInvertButton ?? userSettings.shouldShowInvertButton,
    shouldShowSharpeningFilterButton:
      value.shouldShowSharpeningFilterButton ?? userSettings.shouldShowSharpeningFilterButton,
    tapAreaSize: value.tapAreaSize ?? userSettings.tapAreaSize,
    zoomStep: value.zoomStep ?? userSettings.zoomStep,
  });
};
