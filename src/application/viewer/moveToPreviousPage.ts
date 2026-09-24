import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";

/** 前のページに戻る */
export const moveToPreviousPage = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { fileManager } = appStore.get();
    if (!fileManager.hasPreviousFile()) return;

    const { bookFormat, displayMode } = userSettings;
    appStore.set((a) => {
        const fileManager = a.fileManager.decrementIndex(displayMode);
        return a.copyWith({
            fileManager,
            notification: a.notification.setMessage(fileManager.progress()),
            scrollPct2D: ScrollPct2D.fromBookFormat(bookFormat, false),
        });
    });
};
