type Data = { number: number; index: number; blob: Blob };

export class BlobCache {
    private count: number;
    private dataList: Data[];

    constructor() {
        this.count = 0;
        this.dataList = [];
    }

    /** indexが一致するBlobをキャッシュから取得 */
    readonly getBlob = (index: number): Blob | undefined => {
        return this.dataList.find((d) => d.index === index)?.blob;
    };

    /** キャッシュにBlobを追加 */
    readonly addBlob = (index: number, blob: Blob): void => {
        this.dataList.push({ number: this.count, index, blob });
        this.count += 1;
        this.cutoff();
    };

    /** キャッシュの古いものを切り捨てる */
    private readonly cutoff = (): void => {
        if (this.dataList.length <= 6) return;
        this.dataList = this.dataList
            .sort((a, b) => b.number - a.number)
            .slice(0, 6);
    };
}
