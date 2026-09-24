import type { AppStore } from "../../application/appState/appStore";
import { goToLeft } from "../../application/viewer/goToLeft";
import { goToRight } from "../../application/viewer/goToRight";
import { zoomIn } from "../../application/viewer/zoomIn";
import { zoomOut } from "../../application/viewer/zoomOut";
import type { UserSettings } from "../../domain/models/userSettings/userSettings";

export class KeydownMonitor {
    private readonly appStore: AppStore;
    private readonly userSettings: UserSettings;

    constructor(appStore: AppStore, userSettings: UserSettings) {
        this.appStore = appStore;
        this.userSettings = userSettings;
    }

    /** キーダウンの監視を開始 */
    start(): void {
        document.body.addEventListener("keydown", this.handleKeyDown);
    }

    /** キーダウンの監視を終了 */
    end(): void {
        document.body.removeEventListener("keydown", this.handleKeyDown);
    }

    private handleKeyDown = (ev: KeyboardEvent): void => {
        if (this.appStore.get().isOpenSideMenu) return;
        this._handleKeyDown(
            ev,
            () => goToLeft(this.appStore, this.userSettings),
            () => goToRight(this.appStore, this.userSettings),
            () => zoomIn(this.appStore, this.userSettings),
            () => zoomOut(this.appStore, this.userSettings),
        );
    };

    private _handleKeyDown(
        ev: KeyboardEvent,
        arrowLeft: () => void,
        arrowRight: () => void,
        arrowUp: () => void,
        arrowDown: () => void,
    ): void {
        switch (ev.code) {
            case "ArrowLeft":
                ev.preventDefault(); // ブラウザのデフォルトの振る舞いを無効化
                arrowLeft();
                break;
            case "ArrowRight":
                ev.preventDefault();
                arrowRight();
                break;
            case "ArrowUp":
                ev.preventDefault();
                arrowUp();
                break;
            case "ArrowDown":
                ev.preventDefault();
                arrowDown();
                break;
        }
    }
}
