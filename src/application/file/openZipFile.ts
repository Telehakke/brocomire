import type { FileManager } from "../../domain/models/file/fileManager";
import { ScrollPct2D } from "../../domain/models/scroll/scrollPct2D";
import type { UserSettingsStore } from "../../domain/models/userSettings/userSettingsStore";
import type { AppStore } from "../appState/appStore";
import { moveToIndexPage } from "../viewer/moveToIndexPage";

export const openZipFile = async (
    fileName: string,
    fileManager: FileManager,
    appStore: AppStore,
    userSettingsStore: UserSettingsStore,
): Promise<void> => {
    if (!fileManager.hasFiles()) return;

    const { bookFormat } = userSettingsStore.get();
    const hashedFileName = await calculateHash(fileName);
    appStore.set((a) =>
        a.copyWith({
            fileManager,
            hashedFileName,
            onViewer: true,
            scrollPct2D: ScrollPct2D.fromBookFormat(bookFormat, true),
        }),
    );
    userSettingsStore.set((a) => {
        const histories = a.histories.tryPrepend(hashedFileName);
        moveToIndexPage(
            histories.getClosedPageIndex(hashedFileName) ?? 0,
            appStore,
            userSettingsStore.get(),
        );
        return a.copyWith({ histories });
    });
};

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
