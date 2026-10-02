import type { AppStore } from "../../application/appState/appStore";

export class LandscapeMonitor {
    private readonly appStore: AppStore;
    private readonly mediaQuery: MediaQueryList;

    constructor(appStore: AppStore) {
        this.appStore = appStore;
        this.mediaQuery = window.matchMedia("(orientation: landscape)");
    }

    /** デバイス方向を一度だけ確認 */
    runOnce(): void {
        this.appStore.set((a) =>
            a.setIsLandscape(() => this.mediaQuery.matches),
        );
    }

    /** デバイス方向の監視を開始 */
    start(): void {
        this.mediaQuery.addEventListener("change", this.handleChange);
    }

    /** デバイス方向の監視を終了 */
    end(): void {
        this.mediaQuery.removeEventListener("change", this.handleChange);
    }

    private handleChange = (ev: MediaQueryListEvent): void => {
        this.appStore.set((a) => a.setIsLandscape(() => ev.matches));
    };
}
