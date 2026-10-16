import type { Cache } from "../../domain/models/file/cache";
import type { FileManager } from "../../domain/models/file/fileManager";

export class ImageFileManger implements FileManager {
  private files: readonly File[];

  private constructor(files: readonly File[]) {
    this.files = files;
  }

  static create(files: readonly File[]): ImageFileManger {
    return new this([...files].sort((a, b) => a.name.localeCompare(b.name)));
  }

  clear(): void {
    this.files = [];
  }

  getLength(): number {
    return this.files.length;
  }

  hasFiles(): boolean {
    return this.files.length > 0;
  }

  async getBlob(index: number, cache?: Cache): Promise<Blob | undefined> {
    if (index < 0 || index >= this.getLength()) return undefined;
    const blob = cache?.get(index) ?? this.files.at(index);
    this.addCache(index, blob, cache);
    return blob;
  }

  private addCache(index: number, blob?: Blob, cache?: Cache): void {
    if (blob == null || cache == null) return;
    cache.add(index, blob);
  }

  getHashedFileName(): string | undefined {
    return undefined;
  }
}
