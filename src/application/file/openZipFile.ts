import type { FileManager } from "../../domain/models/file/fileManager";
import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { UserSettingsRepository } from "../../domain/models/userSettings/userSettingsRepository";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettingsStore";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { AppState } from "../appState/appState";
import type { AppStore } from "../appState/appStore";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

export const openZipFile = async (
    fileName: string,
    fileManager: FileManager,
    appStore: AppStore,
    userSettingsStore: UserSettingsStore,
    userSettingsRepository: UserSettingsRepository,
): Promise<void> => {
    if (!fileManager.hasFiles()) return;

    const { bookFormat } = userSettingsStore.get();
    const hashedFileName = await calculateHash(fileName);
    appStore.set((a) =>
        getNextAppState(a, fileManager, hashedFileName, bookFormat),
    );

    userSettingsStore.set((u) => {
        const histories = u.histories.tryPrepend(hashedFileName);
        moveToIndexPage(
            histories.getClosedPageIndex(hashedFileName) ?? 0,
            appStore,
            userSettingsStore.get(),
        );
        return u.setHistories(() => histories, userSettingsRepository);
    });
};

/* -------------------------------------------------------------------------- */

/** ハッシュ値を生成する */
const calculateHash = async (value: string): Promise<string> => {
    const data = new TextEncoder().encode(value);
    try {
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map((v) => v.toString(16).padStart(2, "0"))
            .join("");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        // 開発サーバーではcryptoがエラーを投げる。その場合、入力値をそのまま返す
        return value;
    }
};

const getNextAppState = (
    prev: AppState,
    fileManager: FileManager,
    fileName: string,
    bookFormat: BookFormat,
): AppState => {
    return prev
        .setFileManager(() => fileManager)
        .setHashedFileName(() => fileName)
        .setScrollPct2D(() => ScrollPct2D.fromBookFormat(bookFormat, true))
        .setOnViewer(() => true);
};
