import type { FileManager } from "../../domain/models/file/fileManager";

export class NullFileManager implements FileManager {
  clear(): FileManager {
    return this;
  }

  length(): number {
    return 0;
  }

  hasFiles(): boolean {
    return false;
  }

  async getBlob(): Promise<Blob | undefined> {
    return undefined;
  }

  getHashedFileName(): string | undefined {
    return undefined;
  }
}
