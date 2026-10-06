export class TouchMoveManager {
    private beginX: number;
    private beginY: number;
    private prevX: number;
    private prevY: number;
    private _isScrolled: boolean;

    constructor(x: number, y: number) {
        this.beginX = x;
        this.beginY = y;
        this.prevX = x;
        this.prevY = y;
        this._isScrolled = false;
    }

    /** 一定量スクロールしたかどうか */
    isScrolled(clientX: number, clientY: number): boolean {
        if (this._isScrolled) return true;

        this.prevX = clientX;
        this.prevY = clientY;
        const x = Math.abs(this.beginX - clientX);
        const y = Math.abs(this.beginY - clientY);
        return this.isScrolledPast(Math.max(x, y));
    }

    private isScrolledPast(distance: number): boolean {
        if (distance > 10) {
            this._isScrolled = true;
            return true;
        }
        return false;
    }

    /** 前回呼び出しからの水平方向変化量 */
    deltaX(clientX: number): number {
        const x = this.prevX - clientX;
        this.prevX = clientX;
        return x;
    }

    /** 前回呼び出しからの垂直方向変化量 */
    deltaY(clientY: number): number {
        const x = this.prevY - clientY;
        this.prevY = clientY;
        return x;
    }
}
