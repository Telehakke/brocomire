export class ClockManager {
    readonly time: string;

    constructor(time?: string) {
        this.time = time ?? "";
    }

    /** 次回更新までのミリ秒を取得 */
    static readonly getMsecToNextUpdate = (): number => {
        const now = new Date();
        return 60000 - now.getSeconds() * 1000 - now.getMilliseconds();
    };

    /** 現在時刻に更新 */
    readonly update = (): ClockManager => {
        const now = new Date();
        const hour = this.zeroPadding(now.getHours());
        const minute = this.zeroPadding(now.getMinutes());
        return new ClockManager(`${hour}:${minute}`);
    };

    /** 2桁の0埋め文字列を返す */
    private zeroPadding = (value: number): string => {
        return `${value}`.padStart(2, "0");
    };
}
