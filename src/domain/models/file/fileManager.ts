import type { Cache } from "./cache";

export interface FileManager {
  /** ファイルを全て削除 */
  clear(): void;

  /** ファイルの総数 */
  getLength(): number;

  /** ファイルが存在するかどうか */
  hasFiles(): boolean;

  /** 指定したindexに位置するファイルを取得 */
  getBlob(index: number, cache?: Cache): Promise<Blob | undefined>;

  /** ハッシュ化されたファイル名を取得 */
  getHashedFileName(): string | undefined;
}
