import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";
import type { AppState } from "../appState/appState";
import type { AppStore } from "../appState/appStore";

/** 次のページへ移動 */
export const moveToNextPage = (
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    if (!appStore.get().fileManager.hasNextFile()) return;

    const { bookFormat, displayMode } = userSettings;
    appStore.set((a) => getNextAppState(a, bookFormat, displayMode));
};

/* -------------------------------------------------------------------------- */

const getNextAppState = (
    prev: AppState,
    bookFormat: BookFormat,
    displayMode: DisplayMode,
): AppState => {
    return prev
        .setFileManager((v) => v.fileManager.incrementIndex(displayMode))
        .setNotification((v) =>
            v.notification.setMessage(v.fileManager.progress()),
        )
        .setScrollPct2D(() => ScrollPct2D.fromBookFormat(bookFormat, true));
};
