import type { FileManager } from "../../domain/models/file/fileManager";
import type { BookFormat } from "../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../domain/models/userSettings/valueObjects/displayMode";
import type { BlobCache } from "./blobCache";
import { CurrentIndex } from "./currentIndex";

export class ImageFileManger implements FileManager {
    private readonly files: readonly File[];
    private readonly currentIndex: CurrentIndex;

    private constructor(files: readonly File[], currentIndex: CurrentIndex) {
        this.files = files;
        this.currentIndex = currentIndex;
    }

    static create(files: readonly File[]): ImageFileManger {
        const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
        return new this(sorted, CurrentIndex.createSafe(0, sorted.length - 1));
    }

    clear(): FileManager {
        return new ImageFileManger([], CurrentIndex.createSafe(0, 0));
    }

    size(): number {
        return this.files.length;
    }

    hasFiles(): boolean {
        return this.files.length > 0;
    }

    async getBlob(
        index: number,
        blobCache?: BlobCache,
    ): Promise<Blob | undefined> {
        const blob = this._getBlob(index, blobCache);
        this.cache(index ?? this.currentIndex.value, blob, blobCache);
        return blob;
    }

    private _getBlob(index: number, blobCache?: BlobCache): Blob | undefined {
        const blob = blobCache?.get(index);
        if (blob != null) return blob;

        return this.files.at(index);
    }

    private cache(index: number, blob?: Blob, blobCache?: BlobCache): void {
        if (blob == null || blobCache == null) return;
        blobCache.add(index, blob);
    }

    getIndex(): number {
        return this.currentIndex.value;
    }

    setIndex(index: number): FileManager {
        return new ImageFileManger(
            this.files,
            this.currentIndex.setIndex(index),
        );
    }

    decrementIndex(displayMode: DisplayMode): FileManager {
        return new ImageFileManger(
            this.files,
            this.currentIndex.decrementIndex(displayMode),
        );
    }

    incrementIndex(displayMode: DisplayMode): FileManager {
        return new ImageFileManger(
            this.files,
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
