import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { moveToPreviousPage } from "./moveToPreviousPage";
import { updateScrollPct2D } from "./updateScrollPct";

/** 前へ戻る */
export const goToPrevious = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    updateScrollPct2D(appStore);
    if (canMoveToPreviousPage(appStore, userSettings)) {
        moveToPreviousPage(appStore, userSettings);
        return;
    }
    goToPreviousOrigin(appStore, userSettings);
};

/* -------------------------------------------------------------------------- */

const canMoveToPreviousPage = (
    appStore: AppStore,
    userSetting: UserSettings,
): boolean => {
    const { scrollPct2D, viewerManager } = appStore.get();
    return scrollPct2D.canMoveToPreviousPage(
        userSetting.bookFormat,
        viewerManager.canScrollX(),
        viewerManager.canScrollY(),
    );
};

const goToPreviousOrigin = (
    appStore: AppStore,
    userSetting: UserSettings,
): void => {
    const { bookFormat, scrollStepCount } = userSetting;
    appStore.set((a) => {
        const scrollPct2D = a.scrollPct2D.previous(
            bookFormat,
            scrollStepCount,
            a.viewerManager.canScrollY(),
        );
        a.viewerManager.scrollToPct(scrollPct2D.x, scrollPct2D.y);
        return a.setScrollPct2D(() => scrollPct2D);
    });
};
