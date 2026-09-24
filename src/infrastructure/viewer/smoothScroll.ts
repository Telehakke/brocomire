export class SmoothScroll {
    static readonly SIZE = 10;
    private deltaXList: number[] = [];
    private deltaYList: number[] = [];

    push(deltaX: number, deltaY: number): void {
        this.deltaXList.push(deltaX);
        if (this.deltaXList.length > SmoothScroll.SIZE) {
            this.deltaXList.shift();
        }
        this.deltaYList.push(deltaY);
        if (this.deltaYList.length > SmoothScroll.SIZE) {
            this.deltaYList.shift();
        }
    }

    getPosition(): { x: number; y: number } {
        const x =
            this.deltaXList.length === 0
                ? 0
                : this.add(this.deltaXList) / this.deltaXList.length;
        const y =
            this.deltaYList.length === 0
                ? 0
                : this.add(this.deltaYList) / this.deltaYList.length;
        return { x, y };
    }

    private add(values: number[]): number {
        return values.reduce((acc, current) => acc + current, 0);
    }
}
