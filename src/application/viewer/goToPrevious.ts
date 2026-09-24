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
    const { scrollPct2D, viewerManager } = appStore.get();
    const { bookFormat, scrollStepCount } = userSettings;
    if (
        scrollPct2D.canMoveToPreviousPage(
            bookFormat,
            viewerManager.canScrollX(),
            viewerManager.canScrollY(),
        )
    ) {
        moveToPreviousPage(appStore, userSettings);
        return;
    }

    appStore.set((a) => {
        const scrollPct2D = a.scrollPct2D.previous(
            bookFormat,
            scrollStepCount,
            viewerManager.canScrollY(),
        );
        a.viewerManager.scrollToPct(scrollPct2D.x, scrollPct2D.y);
        return a.copyWith({ scrollPct2D });
    });
};
