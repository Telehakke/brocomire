export class ClickGestureManager {
    private isDoubleClickEnable: boolean;
    private canClick: boolean;
    private canSubClick: boolean;
    private canLongPress: boolean;
    private clickTimerId: number | undefined;
    private longPressTimerId: number | undefined;

    constructor(isDoubleClickEnable: boolean) {
        this.isDoubleClickEnable = isDoubleClickEnable;
        this.canClick = true;
        this.canSubClick = true;
        this.canLongPress = true;
        this.clickTimerId = undefined;
        this.longPressTimerId = undefined;
    }

    /** 状態を初期化 */
    reset(): void {
        this.canClick = true;
        this.canSubClick = true;
        this.canLongPress = true;
    }

    /** クリックでactionを実行 */
    onClick(action: () => void): void {
        if (!this.canClick) {
            this.canClick = true;
            return;
        }
        if (this.isDoubleClickEnable) {
            window.clearInterval(this.clickTimerId);
            this.clickTimerId = window.setTimeout(() => action(), 300);
            return;
        }
        action();
    }

    /** ダブルクリックでactionを実行 */
    onDoubleClick(action: () => void): void {
        if (!this.isDoubleClickEnable) return;
        window.clearTimeout(this.clickTimerId);
        action();
    }

    /** サブクリックでactionを実行 */
    onSubClick(action: () => void): void {
        if (!this.canSubClick) {
            this.canSubClick = true;
            return;
        }
        this.canLongPress = false;
        action();
    }

    /** 長押しでactionを実行 */
    onLongPress(action: () => void): void {
        this.longPressTimerId = window.setTimeout(() => {
            if (!this.canLongPress) {
                this.canLongPress = true;
                return;
            }
            this.canClick = false;
            this.canSubClick = false;
            action();
        }, 500);
    }

    /** 長押しをキャンセル */
    cancelLongPress(): void {
        window.clearTimeout(this.longPressTimerId);
    }
}
