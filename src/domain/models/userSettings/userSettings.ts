import { isNotNull } from "../utils/isNotNull";
import { ValueObject } from "../utils/valueObject";
import { HistoryList } from "./history/historyList";
import type { UserSettingsJSON } from "./userSettingsJSON";
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

type UserSettingsValue = Readonly<{
    bookFormat: BookFormat;
    contentFit: ContentFit;
    displayMode: DisplayMode;
    histories: HistoryList;
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

export class UserSettings extends ValueObject<UserSettingsValue> {
    declare [UserSettingsBrand]: unknown;

    private constructor(value: UserSettingsValue) {
        super(value);
    }

    static createSafe(value?: unknown): UserSettings {
        if (!isNotNull(value))
            return new UserSettings({
                bookFormat: BookFormat.createSafe(),
                contentFit: ContentFit.createSafe(),
                displayMode: DisplayMode.createSafe(),
                histories: new HistoryList(),
                isSafeAreaEnabled: IsSafeAreaEnabled.createSafe(),
                isSmoothScrollEnabled: IsSmoothScrollEnabled.createSafe(),
                longPressRecognitionTime: LongPressRecognitionTime.createSafe(),
                safeAreaLength: SafeAreaLength.createSafe(),
                scrollSpeed: ScrollSpeed.createSafe(),
                scrollStepCount: ScrollStepCount.createSafe(),
                sharpeningFilterStrength: SharpeningFilterStrength.createSafe(),
                shouldAdvance: ShouldAdvance.createSafe(),
                shouldPreload: ShouldPreload.createSafe(),
                shouldShowFullscreenButton:
                    ShouldShowFullscreenButton.createSafe(),
                shouldShowInvertButton: ShouldShowInvertButton.createSafe(),
                shouldShowSharpeningFilterButton:
                    ShouldShowSharpeningFilterButton.createSafe(),
                tapAreaSize: TapAreaSize.createSafe(),
                zoomStep: ZoomStep.createSafe(),
            });

        const v = value as UserSettingsJSON;
        return new UserSettings({
            bookFormat: BookFormat.createSafe(v.bookFormat),
            contentFit: ContentFit.createSafe(v.contentFit),
            displayMode: DisplayMode.createSafe(v.displayMode),
            histories: HistoryList.fromHistoryJSON(v.histories),
            isSafeAreaEnabled: IsSafeAreaEnabled.createSafe(
                v.isSafeAreaEnabled,
            ),
            isSmoothScrollEnabled: IsSmoothScrollEnabled.createSafe(
                v.isSmoothScrollEnabled,
            ),
            longPressRecognitionTime: LongPressRecognitionTime.createSafe(
                v.longPressRecognitionTime,
            ),
            safeAreaLength: SafeAreaLength.createSafe(v.safeAreaLength),
            scrollSpeed: ScrollSpeed.createSafe(v.scrollSpeed),
            scrollStepCount: ScrollStepCount.createSafe(v.scrollStepCount),
            sharpeningFilterStrength: SharpeningFilterStrength.createSafe(
                v.sharpeningFilterStrength,
            ),
            shouldAdvance: ShouldAdvance.createSafe(v.shouldAdvance),
            shouldPreload: ShouldPreload.createSafe(v.shouldPreload),
            shouldShowFullscreenButton: ShouldShowFullscreenButton.createSafe(
                v.shouldShowFullscreenButton,
            ),
            shouldShowInvertButton: ShouldShowInvertButton.createSafe(
                v.shouldShowInvertButton,
            ),
            shouldShowSharpeningFilterButton:
                ShouldShowSharpeningFilterButton.createSafe(
                    v.shouldShowSharpeningFilterButton,
                ),
            tapAreaSize: TapAreaSize.createSafe(v.tapAreaSize),
            zoomStep: ZoomStep.createSafe(v.zoomStep),
        });
    }

    get bookFormat(): BookFormat {
        return this.value.bookFormat;
    }

    get contentFit(): ContentFit {
        return this.value.contentFit;
    }

    get displayMode(): DisplayMode {
        return this.value.displayMode;
    }

    get histories(): HistoryList {
        return this.value.histories;
    }

    get isSafeAreaEnabled(): IsSafeAreaEnabled {
        return this.value.isSafeAreaEnabled;
    }

    get isSmoothScrollEnabled(): IsSmoothScrollEnabled {
        return this.value.isSmoothScrollEnabled;
    }

    get longPressRecognitionTime(): LongPressRecognitionTime {
        return this.value.longPressRecognitionTime;
    }

    get safeAreaLength(): SafeAreaLength {
        return this.value.safeAreaLength;
    }

    get scrollSpeed(): ScrollSpeed {
        return this.value.scrollSpeed;
    }

    get scrollStepCount(): ScrollStepCount {
        return this.value.scrollStepCount;
    }

    get sharpeningFilterStrength(): SharpeningFilterStrength {
        return this.value.sharpeningFilterStrength;
    }

    get shouldAdvance(): ShouldAdvance {
        return this.value.shouldAdvance;
    }

    get shouldPreload(): ShouldPreload {
        return this.value.shouldPreload;
    }

    get shouldShowFullscreenButton(): ShouldShowFullscreenButton {
        return this.value.shouldShowFullscreenButton;
    }

    get shouldShowInvertButton(): ShouldShowInvertButton {
        return this.value.shouldShowInvertButton;
    }

    get shouldShowSharpeningFilterButton(): ShouldShowSharpeningFilterButton {
        return this.value.shouldShowSharpeningFilterButton;
    }

    get tapAreaSize(): TapAreaSize {
        return this.value.tapAreaSize;
    }

    get zoomStep(): ZoomStep {
        return this.value.zoomStep;
    }

    equals(other: this): boolean {
        return (
            this.value.contentFit.equals(other.value.contentFit) &&
            this.value.displayMode.equals(other.value.displayMode) &&
            this.value.histories.equals(other.value.histories) &&
            this.value.isSafeAreaEnabled.equals(
                other.value.isSafeAreaEnabled,
            ) &&
            this.value.isSmoothScrollEnabled.equals(
                other.value.isSmoothScrollEnabled,
            ) &&
            this.value.safeAreaLength.equals(other.value.safeAreaLength) &&
            this.value.scrollSpeed.equals(other.value.scrollSpeed) &&
            this.value.scrollStepCount.equals(other.value.scrollStepCount) &&
            this.value.sharpeningFilterStrength.equals(
                other.value.sharpeningFilterStrength,
            ) &&
            this.value.shouldAdvance.equals(other.value.shouldAdvance) &&
            this.value.shouldPreload.equals(other.value.shouldPreload) &&
            this.value.shouldShowFullscreenButton.equals(
                other.value.shouldShowFullscreenButton,
            ) &&
            this.value.shouldShowInvertButton.equals(
                other.value.shouldShowInvertButton,
            ) &&
            this.value.shouldShowSharpeningFilterButton.equals(
                other.value.shouldShowSharpeningFilterButton,
            ) &&
            this.value.tapAreaSize.equals(other.value.tapAreaSize) &&
            this.value.zoomStep.equals(other.value.zoomStep)
        );
    }

    setBookFormat(
        callback: (prev: UserSettingsValue) => BookFormat,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith({ bookFormat: callback(this.value) }, repository);
    }

    setContentFit(
        callback: (prev: UserSettingsValue) => ContentFit,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith({ contentFit: callback(this.value) }, repository);
    }

    setDisplayMode(
        callback: (prev: UserSettingsValue) => DisplayMode,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith({ displayMode: callback(this.value) }, repository);
    }

    setHistories(
        callback: (prev: UserSettingsValue) => HistoryList,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith({ histories: callback(this.value) }, repository);
    }

    setIsSafeAreaEnabled(
        callback: (prev: UserSettingsValue) => IsSafeAreaEnabled,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { isSafeAreaEnabled: callback(this.value) },
            repository,
        );
    }

    setIsSmoothScrollEnabled(
        callback: (prev: UserSettingsValue) => IsSmoothScrollEnabled,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { isSmoothScrollEnabled: callback(this.value) },
            repository,
        );
    }

    setLongPressRecognitionTime(
        callback: (prev: UserSettingsValue) => LongPressRecognitionTime,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { longPressRecognitionTime: callback(this.value) },
            repository,
        );
    }

    setSafeAreaLength(
        callback: (prev: UserSettingsValue) => SafeAreaLength,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { safeAreaLength: callback(this.value) },
            repository,
        );
    }

    setScrollSpeed(
        callback: (prev: UserSettingsValue) => ScrollSpeed,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith({ scrollSpeed: callback(this.value) }, repository);
    }

    setScrollStepCount(
        callback: (prev: UserSettingsValue) => ScrollStepCount,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { scrollStepCount: callback(this.value) },
            repository,
        );
    }

    setSharpeningFilterStrength(
        callback: (prev: UserSettingsValue) => SharpeningFilterStrength,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { sharpeningFilterStrength: callback(this.value) },
            repository,
        );
    }

    setShouldAdvance(
        callback: (prev: UserSettingsValue) => ShouldAdvance,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { shouldAdvance: callback(this.value) },
            repository,
        );
    }

    setShouldPreload(
        callback: (prev: UserSettingsValue) => ShouldPreload,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { shouldPreload: callback(this.value) },
            repository,
        );
    }

    setShouldShowFullscreenButton(
        callback: (prev: UserSettingsValue) => ShouldShowFullscreenButton,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { shouldShowFullscreenButton: callback(this.value) },
            repository,
        );
    }

    setShouldShowInvertButton(
        callback: (prev: UserSettingsValue) => ShouldShowInvertButton,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { shouldShowInvertButton: callback(this.value) },
            repository,
        );
    }

    setShouldShowSharpeningFilterButton(
        callback: (prev: UserSettingsValue) => ShouldShowSharpeningFilterButton,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith(
            { shouldShowSharpeningFilterButton: callback(this.value) },
            repository,
        );
    }

    setTapAreaSize(
        callback: (prev: UserSettingsValue) => TapAreaSize,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith({ tapAreaSize: callback(this.value) }, repository);
    }

    setZoomStep(
        callback: (prev: UserSettingsValue) => ZoomStep,
        repository: UserSettingsRepository,
    ): UserSettings {
        return this.copyWith({ zoomStep: callback(this.value) }, repository);
    }

    /** 指定した項目を上書きした新しいインスタンスを返す */
    private copyWith(
        {
            bookFormat,
            contentFit,
            displayMode,
            histories,
            isSafeAreaEnabled,
            isSmoothScrollEnabled,
            longPressRecognitionTime,
            safeAreaLength,
            scrollSpeed,
            scrollStepCount,
            sharpeningFilterStrength,
            shouldAdvance,
            shouldPreload,
            shouldShowFullscreenButton,
            shouldShowInvertButton,
            shouldShowSharpeningFilterButton,
            tapAreaSize,
            zoomStep,
        }: Partial<UserSettingsValue>,
        userSettingsRepository: UserSettingsRepository,
    ): UserSettings {
        const obj = new UserSettings({
            bookFormat: bookFormat ?? this.value.bookFormat,
            contentFit: contentFit ?? this.value.contentFit,
            displayMode: displayMode ?? this.value.displayMode,
            histories: histories ?? this.value.histories,
            isSafeAreaEnabled:
                isSafeAreaEnabled ?? this.value.isSafeAreaEnabled,
            isSmoothScrollEnabled:
                isSmoothScrollEnabled ?? this.value.isSmoothScrollEnabled,
            longPressRecognitionTime:
                longPressRecognitionTime ?? this.value.longPressRecognitionTime,
            safeAreaLength: safeAreaLength ?? this.value.safeAreaLength,
            scrollSpeed: scrollSpeed ?? this.value.scrollSpeed,
            scrollStepCount: scrollStepCount ?? this.value.scrollStepCount,
            sharpeningFilterStrength:
                sharpeningFilterStrength ?? this.value.sharpeningFilterStrength,
            shouldAdvance: shouldAdvance ?? this.value.shouldAdvance,
            shouldPreload: shouldPreload ?? this.value.shouldPreload,
            shouldShowFullscreenButton:
                shouldShowFullscreenButton ??
                this.value.shouldShowFullscreenButton,
            shouldShowInvertButton:
                shouldShowInvertButton ?? this.value.shouldShowInvertButton,
            shouldShowSharpeningFilterButton:
                shouldShowSharpeningFilterButton ??
                this.value.shouldShowSharpeningFilterButton,
            tapAreaSize: tapAreaSize ?? this.value.tapAreaSize,
            zoomStep: zoomStep ?? this.value.zoomStep,
        });
        userSettingsRepository.save(obj);
        return obj;
    }
}
