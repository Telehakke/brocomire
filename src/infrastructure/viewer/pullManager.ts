import { ChevronMark } from "../../application/appState/valueObjects/chevronMark";

export class PullManager {
    private readonly distance = 100;
    private count: number;

    constructor() {
        this.count = 0;
    }

    /** 水平方向の変化量を加算 */
    add(deltaX: number): void {
        this.count += deltaX;
    }

    /** 状態を初期化 */
    reset(): void {
        this.count = 0;
    }

    /** 表示するアイコンの種類 */
    getChevronMark(): ChevronMark {
        if (this.canLeftPull()) return new ChevronMark("left");
        if (this.canRightPull()) return new ChevronMark("right");
        return new ChevronMark("none");
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
        return this.count < -this.distance;
    }

    private canRightPull(): boolean {
        return this.count > this.distance;
    }
}
