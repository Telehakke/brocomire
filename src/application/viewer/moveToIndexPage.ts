import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { AppStore } from "../appState/appStore";

/** 指定したindexのページへ移動 */
export const moveToIndexPage = (
    index: number,
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    const { bookFormat } = userSettings;
    appStore.set((a) => {
        const fileManager = a.fileManager.setIndex(index);
        a.cache.clear();
        return a.copyWith({
            fileManager,
            notification: a.notification.setMessage(fileManager.progress()),
            scrollPct2D: ScrollPct2D.fromBookFormat(bookFormat, true),
        });
    });
};
