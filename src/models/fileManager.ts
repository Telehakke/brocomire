import {
    BlobReader,
    BlobWriter,
    ZipReader,
    type Entry,
    type FileEntry,
} from "@zip.js/zip.js";
import type { DisplayMode, WritingType } from "./appState";
import { BlobCache } from "./blobCache";

export class FileManager {
    readonly files: readonly File[] | readonly Entry[];
    readonly index: number;
    private readonly blobCache: BlobCache;

    constructor(
        files?: readonly File[] | readonly Entry[],
        index?: number,
        blobCache?: BlobCache,
    ) {
        this.files = files ?? [];
        this.index = index ?? 0;
        this.blobCache = blobCache ?? new BlobCache();
    }

    static readonly fromFiles = (files: readonly File[]): FileManager => {
        const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
        return new FileManager(sorted);
    };

    static readonly fromZip = async (file: File): Promise<FileManager> => {
        const reader = new BlobReader(file);
        const zipReader = new ZipReader(reader);

        const entries = await zipReader.getEntries();
        const images = entries
            .filter((entry) => {
                const name = entry.filename.toLowerCase();
                if (name.startsWith("__")) return false;
                if (name.startsWith(".")) return false;
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

        await zipReader.close();
        return new FileManager(images);
    };

    get length(): number {
        return this.files.length;
    }

    readonly hasFiles = (): boolean => {
        return this.files.length > 0;
    };

    readonly getBlob = async (index?: number): Promise<Blob | undefined> => {
        if (index == null) return undefined;
        if (index < 0) return undefined;

        const blob = this.blobCache.getBlob(index);
        if (blob != null) return blob;

        const file = this.files.at(index);
        if (file == null) return undefined;

        if (file instanceof File) {
            this.blobCache.addBlob(index, file);
            return file;
        }

        const data = await (file as FileEntry).getData(new BlobWriter());
        this.blobCache.addBlob(index, data);
        return data;
    };

    readonly getLeftIndex = ({
        displayMode,
        writingType,
    }: {
        displayMode: DisplayMode;
        writingType: WritingType;
    }): number => {
        let i = this.index;
        const isOdd = this.index % 2 === 1;
        switch (displayMode) {
            case "book":
                if (writingType === "vertical" && isOdd) {
                    i = this.index + 1;
                } else if (writingType === "horizontal" && !isOdd) {
                    i = this.index - 1;
                }
                break;
            case "double":
                if (writingType === "vertical" && !isOdd) {
                    i = this.index + 1;
                } else if (writingType === "horizontal" && isOdd) {
                    i = this.index - 1;
                }
                break;
        }
        return i;
    };

    readonly getRightIndex = ({
        displayMode,
        writingType,
    }: {
        displayMode: DisplayMode;
        writingType: WritingType;
    }): number | undefined => {
        let i = this.index;
        const isOdd = this.index % 2 === 1;
        switch (displayMode) {
            case "single":
                return undefined;
            case "book":
                if (writingType === "vertical" && !isOdd) {
                    i = this.index - 1;
                } else if (writingType === "horizontal" && isOdd) {
                    i = this.index + 1;
                }
                break;
            case "double":
                if (writingType === "vertical" && isOdd) {
                    i = this.index - 1;
                } else if (writingType === "horizontal" && !isOdd) {
                    i = this.index + 1;
                }
                break;
        }
        return i;
    };

    readonly progress = (): string | undefined => {
        if (!this.hasFiles()) return undefined;
        return `${this.index + 1} / ${this.files.length}`;
    };

    readonly hasPreviousFile = (): boolean => {
        return this.index > 0;
    };

    readonly hasNextFile = (): boolean => {
        return this.index < this.files.length - 1;
    };

    readonly prevIndex = ({
        displayMode,
    }: {
        displayMode: DisplayMode;
    }): FileManager => {
        const amount = displayMode === "single" ? 1 : 2;
        return this.copyWith({ index: Math.max(this.index - amount, 0) });
    };

    readonly nextIndex = ({
        displayMode,
    }: {
        displayMode: DisplayMode;
    }): FileManager => {
        const amount = displayMode === "single" ? 1 : 2;
        return this.copyWith({
            index: Math.min(this.index + amount, this.files.length - 1),
        });
    };

    readonly setIndex = (index: number): FileManager => {
        return this.copyWith({
            index: Math.max(Math.min(index, this.files.length - 1), 0),
        });
    };

    /** キャッシュの古いものを切り捨てる */
    readonly cutoff = (max: number): void => {
        this.blobCache.cutoff(max);
    };

    private readonly copyWith = ({
        files,
        index,
    }: Partial<{
        files: readonly File[] | readonly Entry[];
        index: number;
    }>): FileManager => {
        return new FileManager(
            files ?? this.files,
            index ?? this.index,
            this.blobCache,
        );
    };
}
