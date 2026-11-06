import { BlobReader, BlobWriter, ZipReader, type Entry, type FileEntry } from "@zip.js/zip.js";
import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";
import { calculateHash } from "./calculateHash";

export class ZipFileManager implements FileManager {
  private entries: readonly Entry[];
  private hashedFileName: string | undefined;

  private constructor(entries: readonly Entry[], hashedFileName?: string) {
    this.entries = entries;
    this.hashedFileName = hashedFileName;
  }

  static async create(file: File): Promise<ZipFileManager> {
    const reader = new BlobReader(file);
    const zipReader = new ZipReader(reader);
    const entries = await zipReader.getEntries();
    const imageFiles = this.filterImages(entries);
    await zipReader.close();
    return new this(imageFiles, await calculateHash(file.name));
  }

  private static filterImages(entries: Entry[]): Entry[] {
    return entries
      .filter((e) => {
        const filename = e.filename.toLowerCase();
        if (this.isHiddenFile(filename)) return false;
        if (this.isImageFile(filename)) return true;
        return false;
      })
      .sort((a, b) => a.filename.localeCompare(b.filename));
  }

  private static isHiddenFile(filename: string): boolean {
    return filename.startsWith("__") || filename.startsWith(".");
  }

  private static isImageFile(filename: string): boolean {
    return (
      filename.endsWith(".jpg") ||
      filename.endsWith(".jpeg") ||
      filename.endsWith(".png") ||
      filename.endsWith(".webp") ||
      filename.endsWith(".avif") ||
      filename.endsWith(".heic") ||
      filename.endsWith(".jxl")
    );
  }

  clear(): void {
    this.entries = [];
    this.hashedFileName = undefined;
  }

  getLength(): number {
    return this.entries.length;
  }

  hasFiles(): boolean {
    return this.entries.length > 0;
  }

  async getBlob(index: number, cache?: Cache): Promise<Blob | undefined> {
    if (index < 0 || index >= this.getLength()) return undefined;

    const blob = await this._getBlob(index, cache);
    this.addCache(index, blob, cache);
    return blob;
  }

  private async _getBlob(index: number, cache?: Cache): Promise<Blob | undefined> {
    const blob = cache?.getBlob(index);
    if (blob != null) return blob;

    return await (this.entries.at(index) as FileEntry | undefined)?.getData(new BlobWriter());
  }

  private addCache(index: number, blob?: Blob, cache?: Cache): void {
    if (blob == null || cache == null) return;
    cache.addBlob(index, blob);
  }

  getHashedFileName(): string | undefined {
    return this.hashedFileName;
  }
}
