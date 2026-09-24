import type { Cache } from "../../domain/models/file/cache";

type BlobCacheValue = { fileIndex: number; blob: Blob };

export class BlobCache implements Cache {
    private values: BlobCacheValue[];

    constructor() {
        this.values = [];
    }

    get(index: number): Blob | undefined {
        return this.values.find((v) => v.fileIndex === index)?.blob;
    }

    add(index: number, blob: Blob): void {
        this.values.push({ fileIndex: index, blob });
    }

    trimBefore(fileIndex: number): void {
        this.values = this.values
            .sort((a, b) => b.fileIndex - a.fileIndex)
            .filter((v) => v.fileIndex >= fileIndex);
    }

    trimAfter(fileIndex: number): void {
        this.values = this.values
            .sort((a, b) => a.fileIndex - b.fileIndex)
            .filter((v) => v.fileIndex <= fileIndex);
    }

    clear(): void {
        this.values = [];
    }
}
