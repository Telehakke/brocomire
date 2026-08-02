export class FullscreenManager {
    readonly onFullscreen: boolean;

    constructor(state: boolean) {
        this.onFullscreen = state;
    }

    /** フルスクリーン機能を使用できるかどうか */
    readonly canFullscreen = (): boolean => {
        return document.documentElement.requestFullscreen != null;
    };

    /** フルスクリーンを切り替える */
    readonly toggle = (): FullscreenManager => {
        if (this.onFullscreen) {
            document.exitFullscreen().catch(() => {});
            return new FullscreenManager(false);
        }
        document.documentElement.requestFullscreen().catch(() => {});
        return new FullscreenManager(true);
    };

    /** フルスクリーンを解除 */
    readonly exit = (): FullscreenManager => {
        if (document.exitFullscreen != null) {
            document.exitFullscreen().catch(() => {});
        }
        return new FullscreenManager(false);
    };
}
