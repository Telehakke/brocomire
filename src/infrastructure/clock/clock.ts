export class Clock {
    /** 次回更新のタイミングをミリ秒で取得 */
    static getMsecToNextUpdate(): number {
        const now = new Date();
        return 60000 - now.getSeconds() * 1000 - now.getMilliseconds();
    }

    /** 現在時刻を返す */
    static now(): string {
        const now = new Date();
        const hour = this.zeroPadding(now.getHours());
        const minute = this.zeroPadding(now.getMinutes());
        return `${hour}:${minute}`;
    }

    private static zeroPadding(value: number): string {
        return `${value}`.padStart(2, "0");
    }
}
