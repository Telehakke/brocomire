export interface Cache {
    /** キャッシュからindexに一致するBlobを取得 */
    get(index: number): Blob | undefined;

    /** キャッシュに追加 */
    add(index: number, blob: Blob): void;

    /** ページインデックス未満のキャッシュを切り捨てる */
    trimBefore(pageIndex: number): void;

    /** ページインデックスを超えるキャッシュを切り捨てる */
    trimAfter(pageIndex: number): void;

    /** キャッシュを全て削除 */
    clear(): void;
}
