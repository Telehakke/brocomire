import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { UserSettingsJSON } from "../../domain/models/userSettings/userSettingsJSON";

export const serializeUserSettings = (userSettings: UserSettings): string => {
    const json: UserSettingsJSON = {
        bookFormat: userSettings.value.bookFormat.value,
        contentFit: userSettings.value.contentFit.value,
        displayMode: userSettings.value.displayMode.value,
        histories: userSettings.value.histories.value.map((v) => {
            return { id: v.id, closedPageIndex: v.closedPageIndex };
        }),
        isSafeAreaEnabled: userSettings.value.isSafeAreaEnabled.value,
        isSmoothScrollEnabled: userSettings.value.isSmoothScrollEnabled.value,
        scrollSpeed: userSettings.value.scrollSpeed.value,
        scrollStepCount: userSettings.value.scrollStepCount.value,
        sharpeningFilterStrength:
            userSettings.value.sharpeningFilterStrength.value,
        shouldAdvance: userSettings.value.shouldAdvance.value,
        shouldPreload: userSettings.value.shouldPreload.value,
        shouldShowFullscreenButton:
            userSettings.value.shouldShowFullscreenButton.value,
        shouldShowInvertButton: userSettings.value.shouldShowInvertButton.value,
        shouldShowSharpeningFilterButton:
            userSettings.value.shouldShowSharpeningFilterButton.value,
        tapAreaSize: userSettings.value.tapAreaSize.value,
        zoomStep: userSettings.value.zoomStep.value,
    };
    return JSON.stringify(json);
};
