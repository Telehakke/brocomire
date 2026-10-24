export interface Cache {
  /** キャッシュからfileIndexに一致するBlobを取得 */
  getBlob(fileIndex: number): Blob | undefined;

  /** キャッシュに追加 */
  addBlob(fileIndex: number, blob: Blob): void;

  /** minIndex未満とmaxIndexを超えるキャッシュを切り捨てる */
  trim(minIndex: number, maxIndex: number): void;

  /** キャッシュを全て破棄 */
  clear(): void;
}
