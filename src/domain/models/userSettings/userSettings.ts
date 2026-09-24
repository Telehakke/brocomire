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

    /** 指定した項目を上書きした新しいインスタンスを返す */
    copyWith(
        {
            bookFormat,
            contentFit,
            displayMode,
            histories,
            isSafeAreaEnabled,
            isSmoothScrollEnabled,
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
        userSettingsRepository?: UserSettingsRepository,
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
        userSettingsRepository?.save(obj);
        return obj;
    }
}
