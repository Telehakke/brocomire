import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";
import { moveToNextPage } from "./moveToNextPage";
import { updateScrollPct2D } from "./updateScrollPct";

/** 次へ進む */
export const goToNext = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    updateScrollPct2D(appStore);
    if (canMoveToNextPage(appStore, userSettings)) {
        moveToNextPage(appStore, userSettings);
        return;
    }
    goToNextOrigin(appStore, userSettings);
};

/* -------------------------------------------------------------------------- */

const canMoveToNextPage = (
    appStore: AppStore,
    userSetting: UserSettings,
): boolean => {
    const { scrollPct2D, viewerManager } = appStore.get();
    return scrollPct2D.canMoveToNextPage(
        userSetting.bookFormat,
        viewerManager.canScrollX(),
        viewerManager.canScrollY(),
    );
};

const goToNextOrigin = (
    appStore: AppStore,
    userSetting: UserSettings,
): void => {
    const { bookFormat, scrollStepCount } = userSetting;
    appStore.set((a) => {
        const scrollPct2D = a.scrollPct2D.next(
            bookFormat,
            scrollStepCount,
            a.viewerManager.canScrollY(),
        );
        a.viewerManager.scrollToPct(scrollPct2D.x, scrollPct2D.y);
        return a.setScrollPct2D(() => scrollPct2D);
    });
};
