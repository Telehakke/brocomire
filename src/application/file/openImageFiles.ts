import type { FileManager } from "../../domain/models/file/fileManager";
import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { AppState } from "../appState/appState";
import type { AppStore } from "../appState/appStore";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

/** 画像ファイルを開く */
export const openImageFiles = (
    fileManager: FileManager,
    appStore: AppStore,
    userSettings: UserSettings,
): void => {
    if (!fileManager.hasFiles()) return;

    const { bookFormat } = userSettings;
    moveToIndexPage(0, appStore, userSettings);
    appStore.set((a) => getNextAppState(a, fileManager, bookFormat));
};

/* -------------------------------------------------------------------------- */

const getNextAppState = (
    prev: AppState,
    fileManager: FileManager,
    bookFormat: BookFormat,
): AppState => {
    return prev
        .setFileManager(() => fileManager)
        .setScrollPct2D(() => ScrollPct2D.fromBookFormat(bookFormat, true))
        .setOnViewer(() => true);
};
