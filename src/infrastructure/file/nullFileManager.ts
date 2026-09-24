import type { FileManager } from "../../domain/models/file/fileManager";

export class NullFileManager implements FileManager {
    clear(): FileManager {
        return this;
    }
    size(): number {
        return 0;
    }
    hasFiles(): boolean {
        return false;
    }
    async getBlob(): Promise<Blob | undefined> {
        return undefined;
    }
    getIndex(): number {
        return 0;
    }
    setIndex(): FileManager {
        return this;
    }
    decrementIndex(): FileManager {
        return this;
    }
    incrementIndex(): FileManager {
        return this;
    }
    progress(): string | undefined {
        return undefined;
    }
    hasPreviousFile(): boolean {
        return false;
    }
    hasNextFile(): boolean {
        return false;
    }
    getLeftIndex(): number {
        return 0;
    }
    getRightIndex(): number | undefined {
        return 0;
    }
}
