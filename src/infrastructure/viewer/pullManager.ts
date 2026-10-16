import * as ChevronMark from "../../application/appState/chevronMark";

export class PullManager {
  private readonly DISTANCE = 100;
  private amount: number;

  constructor() {
    this.amount = 0;
  }

  /** 水平方向の変化量を加算 */
  add(deltaX: number): void {
    this.amount += deltaX;
  }

  /** 状態を初期化 */
  reset(): void {
    this.amount = 0;
  }

  /** 表示するアイコンの種類 */
  getChevronMark(): ChevronMark.ChevronMark {
    if (this.canLeftPull()) return ChevronMark.create("left");
    if (this.canRightPull()) return ChevronMark.create("right");
    return ChevronMark.create("none");
  }

  /** 左端の限界を超えて引っ張るとactionを実行 */
  onLeftSidePull(action: () => void): void {
    if (!this.canLeftPull()) return;
    action();
  }

  /** 右端の限界を超えて引っ張るとactionを実行 */
  onRightSidePull(action: () => void): void {
    if (!this.canRightPull()) return;
    action();
  }

  private canLeftPull(): boolean {
    return this.amount < -this.DISTANCE;
  }

  private canRightPull(): boolean {
    return this.amount > this.DISTANCE;
  }
}
