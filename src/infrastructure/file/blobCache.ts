import type { Cache } from "../../domain/models/file/cache";

type BlobCacheValue = Readonly<{ fileIndex: number; blob: Blob }>;

export class BlobCache implements Cache {
  private values: BlobCacheValue[];

  constructor() {
    this.values = [];
  }

  get(fileIndex: number): Blob | undefined {
    return this.values.find((v) => v.fileIndex === fileIndex)?.blob;
  }

  add(fileIndex: number, blob: Blob): void {
    if (this.values.find((v) => v.fileIndex === fileIndex)) return;

    this.values.push({ fileIndex, blob });
  }

  trim(minIndex: number, maxIndex: number): void {
    this.values = this.values.filter((v) => minIndex <= v.fileIndex && v.fileIndex <= maxIndex);
  }

  clear(): void {
    this.values = [];
  }
}
