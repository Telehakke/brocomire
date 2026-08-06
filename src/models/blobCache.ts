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
        console.log(this.dataList);
    };

    /** キャッシュの古いものを切り捨てる */
    readonly cutoff = (max: number): void => {
        const maxAmount = max * 2;
        if (this.dataList.length <= maxAmount) return;
        this.dataList = this.dataList
            .sort((a, b) => b.number - a.number)
            .slice(0, maxAmount);
    };
}
