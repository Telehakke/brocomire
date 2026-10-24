import type { Cache } from "../../domain/models/file/cache";

type BlobCacheValue = Readonly<{ fileIndex: number; blob: Blob }>;

export class BlobCache implements Cache {
  private array: BlobCacheValue[];

  constructor(array?: BlobCacheValue[]) {
    this.array = array ?? [];
  }

  getLength(): number {
    return this.array.length;
  }

  getBlob(fileIndex: number): Blob | undefined {
    return this.array.find((v) => v.fileIndex === fileIndex)?.blob;
  }

  addBlob(fileIndex: number, blob: Blob): void {
    if (this.array.find((v) => v.fileIndex === fileIndex) != null) return;

    this.array.push({ fileIndex, blob });
  }

  trim(minIndex: number, maxIndex: number): void {
    this.array = this.array.filter((v) => minIndex <= v.fileIndex && v.fileIndex <= maxIndex);
  }

  clear(): void {
    this.array = [];
  }
}
