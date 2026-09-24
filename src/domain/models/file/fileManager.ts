import type { BookFormat } from "../userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../userSettings/valueObjects/displayMode";
import type { Cache } from "./cache";

export interface FileManager {
    /** ファイルを全て削除した新しいインスタンスを返す */
    clear(): FileManager;

    /** ファイルの総数 */
    size(): number;

    /** ファイルが存在するかどうか */
    hasFiles(): boolean;

    /**
     * 指定したindexのファイルを取得
     */
    getBlob(index: number, cache?: Cache): Promise<Blob | undefined>;

    /** 現在のインデックスを返す */
    getIndex(): number;

    /** 指定したインデックスに変更した新たなインスタンスを返す */
    setIndex(index: number): FileManager;

    /** インデックスを1(見開きであれば2)減らした新たなインスタンスを返す */
    decrementIndex(displayMode: DisplayMode): FileManager;

    /** インデックスを1(見開きであれば2)増やした新たなインスタンスを返す */
    incrementIndex(displayMode: DisplayMode): FileManager;

    /** '現在のページ数 / 総ページ数'を返す */
    progress(): string | undefined;

    /** 前のファイルが存在するかどうか */
    hasPreviousFile(): boolean;

    /** 次のファイルが存在するかどうか */
    hasNextFile(): boolean;

    /** ビューアで左側に表示されるファイルの現在のインデックスを返す */
    getLeftIndex(
        bookFormat: BookFormat,
        displayMode: DisplayMode,
    ): number | undefined;

    /** ビューアで右側に表示されるファイルの現在のインデックスを返す */
    getRightIndex(
        bookFormat: BookFormat,
        displayMode: DisplayMode,
    ): number | undefined;
}
