export class Fullscreen {
    /** フルスクリーンを使用できるかどうか */
    static canUse(): boolean {
        return document.documentElement.requestFullscreen != null;
    }

    /** フルスクリーンを実行 */
    static execute(): void {
        document.documentElement.requestFullscreen().catch(() => {});
    }

    /** フルスクリーンを解除 */
    static exit(): void {
        if (document.exitFullscreen == null) return;
        document.exitFullscreen().catch(() => {});
    }
}
