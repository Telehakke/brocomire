import type { FileManager } from "../../domain/models/file/fileManager";
import type { BlobCache } from "./blobCache";

export class ImageFileManger implements FileManager {
  private readonly files: readonly File[];

  private constructor(files: readonly File[]) {
    this.files = files;
  }

  static create(files: readonly File[]): ImageFileManger {
    const sorted = [...files].sort((a, b) => a.name.localeCompare(b.name));
    return new this(sorted);
  }

  clear(): FileManager {
    return new ImageFileManger([]);
  }

  length(): number {
    return this.files.length;
  }

  hasFiles(): boolean {
    return this.files.length > 0;
  }

  async getBlob(index: number, blobCache?: BlobCache): Promise<Blob | undefined> {
    if (index < 0 || index >= this.length()) return undefined;
    const blob = this._getBlob(index, blobCache);
    this.cache(index, blob, blobCache);
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

  getHashedFileName(): string | undefined {
    return undefined;
  }
}
