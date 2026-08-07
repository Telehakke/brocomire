type Data = { index: number; blob: Blob };

export class BlobCache {
    private dataList: Data[];

    constructor() {
        this.dataList = [];
    }

    /** indexが一致するBlobをキャッシュから取得 */
    readonly getBlob = (index: number): Blob | undefined => {
        return this.dataList.find((d) => d.index === index)?.blob;
    };

    /** キャッシュにBlobを追加 */
    readonly addBlob = (index: number, blob: Blob): void => {
        this.dataList.push({ index, blob });
    };

    /** キャッシュの先頭に位置するものを切り捨てる */
    readonly trimFront = (pageCount: number): void => {
        const max = (pageCount + 2) * 2;
        if (this.dataList.length <= max) return;
        this.dataList = this.dataList
            .sort((a, b) => b.index - a.index)
            .slice(0, max);
    };

    /** キャッシュの最後尾に位置するものを切り捨てる */
    readonly trimBack = (pageCount: number): void => {
        const max = (pageCount + 2) * 2;
        if (this.dataList.length <= max) return;
        this.dataList = this.dataList
            .sort((a, b) => a.index - b.index)
            .slice(0, max);
    };
}
