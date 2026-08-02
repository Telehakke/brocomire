import { atom } from "jotai";
import { Atom } from "../../atoms";
import { FileManager } from "../../models/fileManager";
import { HistoryManager } from "../../models/historyManager";
import { ScrollManager } from "../../models/scrollManager";
import { moveToIndexPageAtom } from "../viewer/actions/viewerActions";

/** 画像ファイルを開く */
export const openImageFileAtom = atom(
    null,
    (get, set, files: readonly File[]) => {
        const fileManager = FileManager.fromFiles(files);
        if (!fileManager.hasFiles()) return;

        set(Atom.fileManager, fileManager);
        set(moveToIndexPageAtom, 0);
        const { writingType } = get(Atom.appStore);
        set(Atom.scrollManager, ScrollManager.fromWritingType(writingType));
        set(Atom.onViewer, true);
    },
);

/** Zipファイルを開く */
export const openZipFileAtom = atom(null, async (get, set, file: File) => {
    const fileManager = await FileManager.fromZip(file);
    if (!fileManager.hasFiles()) return;

    set(Atom.fileManager, fileManager);
    const { histories, writingType } = get(Atom.appStore);

    const fileName = await calculateHash(file.name);
    let historyManager = new HistoryManager(histories).moveToHead(fileName);
    const index = historyManager.getIndex(fileName);
    if (index == null) historyManager = historyManager.add(fileName);
    set(Atom.zipFileName, fileName);
    set(Atom.historyManager, historyManager);
    set(Atom.appStore, (a) => a.setHistories(historyManager.histories));

    set(moveToIndexPageAtom, index ?? 0);
    set(Atom.scrollManager, ScrollManager.fromWritingType(writingType));
    set(Atom.onViewer, true);
});

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
