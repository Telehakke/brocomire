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
    const { scrollPct2D, viewerManager } = appStore.get();
    const { bookFormat, scrollStepCount } = userSettings;
    if (
        scrollPct2D.canMoveToNextPage(
            bookFormat,
            viewerManager.canScrollX(),
            viewerManager.canScrollY(),
        )
    ) {
        moveToNextPage(appStore, userSettings);
        return;
    }

    appStore.set((a) => {
        const scrollPct2D = a.scrollPct2D.next(
            bookFormat,
            scrollStepCount,
            viewerManager.canScrollY(),
        );
        a.viewerManager.scrollToPct(scrollPct2D.x, scrollPct2D.y);
        return a.copyWith({ scrollPct2D });
    });
};
