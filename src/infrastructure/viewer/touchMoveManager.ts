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

  /** 一定量スクロール操作されたかどうか */
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

  /** 前回呼び出しからの変化量 */
  getDelta(clientX: number, clientY: number): { x: number; y: number } {
    return { x: this.getDeltaX(clientX), y: this.getDeltaY(clientY) };
  }

  /** 前回呼び出しからの水平方向変化量 */
  getDeltaX(clientX: number): number {
    const x = this.prevX - clientX;
    this.prevX = clientX;
    return x;
  }

  private getDeltaY(clientY: number): number {
    const y = this.prevY - clientY;
    this.prevY = clientY;
    return y;
  }
}
