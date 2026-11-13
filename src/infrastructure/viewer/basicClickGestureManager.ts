export class BasicClickGestureManager {
  private canClick: boolean;
  private canSubClick: boolean;
  private canLongPress: boolean;
  private clickTimerId: number | undefined;
  private longPressTimerId: number | undefined;

  constructor() {
    this.canClick = true;
    this.canSubClick = true;
    this.canLongPress = true;
    this.clickTimerId = undefined;
    this.longPressTimerId = undefined;
  }

  /** 内部フラグを初期化 */
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

  /** クリックをキャンセル */
  cancelClick(): void {
    this.canClick = false;
  }

  /** 長押しをキャンセル */
  cancelLongPress(): void {
    window.clearTimeout(this.longPressTimerId);
  }
}
