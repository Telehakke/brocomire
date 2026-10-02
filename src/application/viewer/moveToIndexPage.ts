import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { AppState } from "../appState/appState";
import type { AppStore } from "../appState/appStore";

/** 指定したindexのページへ移動 */
export const moveToIndexPage = (
    index: number,
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { bookFormat } = userSettings;
    appStore.get().cache.clear();
    appStore.set((a) => getNextAppState(a, index, bookFormat));
};

/* -------------------------------------------------------------------------- */

const getNextAppState = (
    prev: AppState,
    index: number,
    bookFormat: BookFormat,
): AppState => {
    return prev
        .setFileManager((v) => v.fileManager.setIndex(index))
        .setNotification((v) =>
            v.notification.setMessage(v.fileManager.progress()),
        )
        .setScrollPct2D(() => ScrollPct2D.fromBookFormat(bookFormat, true));
};
