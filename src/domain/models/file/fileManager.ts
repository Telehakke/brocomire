import type { Cache } from "./cache";

export interface FileManager {
  /** ファイルを全て削除した新しいインスタンスを返す */
  clear(): FileManager;

  /** ファイルの総数 */
  length(): number;

  /** ファイルが存在するかどうか */
  hasFiles(): boolean;

  /**
   * 指定したindexのファイルを取得
   */
  getBlob(index: number, cache?: Cache): Promise<Blob | undefined>;

  /** ハッシュ化されたファイル名を取得 */
  getHashedFileName(): string | undefined;
}
