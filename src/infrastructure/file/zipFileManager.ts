import { BlobReader, BlobWriter, ZipReader, type Entry, type FileEntry } from "@zip.js/zip.js";
import type { FileManager } from "../../domain/models/file/fileManager";
import type { BlobCache } from "./blobCache";

export class ZipFileManager implements FileManager {
  private readonly entries: readonly Entry[];
  private readonly hashedFileName: string | undefined;

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
    return new this(imageFiles, await this.calculateHash(file.name));
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

  /** ハッシュ値を生成する */
  private static async calculateHash(value: string): Promise<string> {
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
  }

  clear(): FileManager {
    return new ZipFileManager([], undefined);
  }

  length(): number {
    return this.entries.length;
  }

  hasFiles(): boolean {
    return this.entries.length > 0;
  }

  async getBlob(index: number, blobCache?: BlobCache): Promise<Blob | undefined> {
    if (index < 0 || index >= this.length()) return undefined;
    const blob = await this._getBlob(index, blobCache);
    this.cache(index, blob, blobCache);
    return blob;
  }

  private async _getBlob(index: number, blobCache?: BlobCache): Promise<Blob | undefined> {
    const blob = blobCache?.get(index);
    if (blob != null) return blob;

    return await (this.entries.at(index) as FileEntry | undefined)?.getData(new BlobWriter());
  }

  private cache(index: number, blob?: Blob, blobCache?: BlobCache): void {
    if (blob == null || blobCache == null) return;
    blobCache.add(index, blob);
  }

  getHashedFileName(): string | undefined {
    return this.hashedFileName;
  }
}
