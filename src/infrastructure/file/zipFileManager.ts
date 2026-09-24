import {
    BlobReader,
    BlobWriter,
    ZipReader,
    type Entry,
    type FileEntry,
} from "@zip.js/zip.js";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";
import type { BlobCache } from "./blobCache";
import { CurrentIndex } from "./currentIndex";

export class ZipFileManager implements FileManager {
    private readonly entries: readonly Entry[];
    private readonly currentIndex: CurrentIndex;

    private constructor(entries: readonly Entry[], currentIndex: CurrentIndex) {
        this.entries = entries;
        this.currentIndex = currentIndex;
    }

    static async create(file: File): Promise<ZipFileManager> {
        const reader = new BlobReader(file);
        const zipReader = new ZipReader(reader);
        const entries = await zipReader.getEntries();
        const imageFiles = this.filterImages(entries);
        await zipReader.close();
        return new this(
            imageFiles,
            CurrentIndex.createSafe(0, imageFiles.length - 1),
        );
    }

    private static filterImages(entries: Entry[]): Entry[] {
        return entries
            .filter((e) => {
                const name = e.filename.toLowerCase();
                // 隠しファイルは除外
                if (name.startsWith("__")) return false;
                if (name.startsWith(".")) return false;
                // 拡張子が画像の種類であれば許可
                if (name.endsWith(".jpg")) return true;
                if (name.endsWith(".jpeg")) return true;
                if (name.endsWith(".png")) return true;
                if (name.endsWith(".webp")) return true;
                if (name.endsWith(".avif")) return true;
                if (name.endsWith(".heic")) return true;
                if (name.endsWith(".jxl")) return true;
                return false;
            })
            .sort((a, b) => a.filename.localeCompare(b.filename));
    }

    clear(): FileManager {
        return new ZipFileManager([], CurrentIndex.createSafe(0, 0));
    }

    size(): number {
        return this.entries.length;
    }
    hasFiles(): boolean {
        return this.entries.length > 0;
    }
    async getBlob(
        index: number,
        blobCache?: BlobCache,
    ): Promise<Blob | undefined> {
        const blob = await this._getBlob(index, blobCache);
        this.cache(index, blob, blobCache);
        return blob;
    }

    private async _getBlob(
        index: number,
        blobCache?: BlobCache,
    ): Promise<Blob | undefined> {
        const blob = blobCache?.get(index);
        if (blob != null) return blob;

        return await (this.entries.at(index) as FileEntry | undefined)?.getData(
            new BlobWriter(),
        );
    }

    private cache(index: number, blob?: Blob, blobCache?: BlobCache): void {
        if (blob == null || blobCache == null) return;
        blobCache.add(index, blob);
    }

    getIndex(): number {
        return this.currentIndex.value;
    }

    setIndex(index: number): FileManager {
        return new ZipFileManager(
            this.entries,
            this.currentIndex.setIndex(index),
        );
    }

    decrementIndex(displayMode: DisplayMode): FileManager {
        return new ZipFileManager(
            this.entries,
            this.currentIndex.decrementIndex(displayMode),
        );
    }

    incrementIndex(displayMode: DisplayMode): FileManager {
        return new ZipFileManager(
            this.entries,
            this.currentIndex.incrementIndex(displayMode),
        );
    }

    progress(): string | undefined {
        return this.currentIndex.progress(this.size());
    }

    hasPreviousFile(): boolean {
        return this.currentIndex.hasPreviousFile();
    }

    hasNextFile(): boolean {
        return this.currentIndex.hasNextFile(this.size());
    }

    getLeftIndex(
        bookFormat: BookFormat,
        displayMode: DisplayMode,
    ): number | undefined {
        return this.currentIndex.getLeftIndex(bookFormat, displayMode);
    }

    getRightIndex(
        bookFormat: BookFormat,
        displayMode: DisplayMode,
    ): number | undefined {
        return this.currentIndex.getRightIndex(bookFormat, displayMode);
    }
}
