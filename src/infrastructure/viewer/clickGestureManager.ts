export class ClickGestureManager {
    private canClick: boolean;
    private canSubClick: boolean;
    private canLongPress: boolean;
    private clickTimerId: number | undefined;
    private longPressTimerId: number | undefined;
    private clickCount: number;

    constructor() {
        this.canClick = true;
        this.canSubClick = true;
        this.canLongPress = true;
        this.clickTimerId = undefined;
        this.longPressTimerId = undefined;
        this.clickCount = 0;
    }

    /** 状態を初期化 */
    reset(): void {
        this.canClick = true;
        this.canSubClick = true;
        this.canLongPress = true;
    }

    /** クリックでactionを実行 */
    onClick(singleClicked: () => void, doubleClicked?: () => void): void {
        this.clickCount += 1;
        if (!this.canClick) {
            this.canClick = true;
            this.clickCount = 0;
            return;
        }
        if (doubleClicked != null) {
            if (this.clickCount === 2) {
                window.clearInterval(this.clickTimerId);
                doubleClicked();
                this.clickCount = 0;
                return;
            }
            this.clickTimerId = window.setTimeout(() => {
                singleClicked();
                this.clickCount = 0;
            }, 400);
            return;
        }
        singleClicked();
        this.clickCount = 0;
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
    onLongPress(action: () => void, timeout: number): void {
        this.longPressTimerId = window.setTimeout(() => {
            if (!this.canLongPress) {
                this.canLongPress = true;
                return;
            }
            this.canClick = false;
            this.canSubClick = false;
            action();
        }, timeout);
    }

    /** 長押しをキャンセル */
    cancelLongPress(): void {
        window.clearTimeout(this.longPressTimerId);
    }
}
