export class SmoothScroll {
  private readonly SIZE = 10;
  private deltaXList: number[] = [];
  private deltaYList: number[] = [];

  /** 変化量を追加 */
  push(deltaX: number, deltaY: number): void {
    this.deltaXList.push(deltaX);
    if (this.deltaXList.length > this.SIZE) this.deltaXList.shift();

    this.deltaYList.push(deltaY);
    if (this.deltaYList.length > this.SIZE) this.deltaYList.shift();
  }

  /** 直近10サンプルを平均化した変化量を返す */
  getAverageDelta(): { x: number; y: number } {
    return {
      x: this.deltaXList.length === 0 ? 0 : this.add(this.deltaXList) / this.deltaXList.length,
      y: this.deltaYList.length === 0 ? 0 : this.add(this.deltaYList) / this.deltaYList.length,
    };
  }

  private add(array: number[]): number {
    return array.reduce((acc, current) => acc + current, 0);
  }
}
