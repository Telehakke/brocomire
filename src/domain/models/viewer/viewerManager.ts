export type ViewerBodyProperties = {
    clientWidth: number;
    clientHeight: number;
    scrollLeft: number;
    scrollTop: number;
    scroll: (x: number, y: number) => void;
};
export type ViewerCanvasProperties = {
    clientWidth: number;
    clientHeight: number;
};
export type Size = { width: number; height: number };

export interface ViewerManager {
    setBody(body: () => ViewerBodyProperties): ViewerManager;

    setCanvas(canvas: () => ViewerCanvasProperties): ViewerManager;

    copy(): ViewerManager;

    /**
     * 水平方向のスクロール位置をパーセンテージで返す\
     * スクロール不可であればundefinedを返す
     */
    scrollXPct(): number | undefined;

    /**
     * 垂直方向のスクロール位置をパーセンテージで返す\
     * スクロール不可であればundefinedを返す
     */
    scrollYPct(): number | undefined;

    /** 水平方向にスクロール可能であるかどうか */
    canScrollX(): boolean;

    /** 垂直方向にスクロール可能であるかどうか */
    canScrollY(): boolean;

    /** 水平方向のスクロール限界に達しているかどうか */
    isReachedLimitX(): boolean;

    /**
     * ビューア縦横比よりも画像の方が横に長いかどうか\
     * 結果の判定が不可能であればundefinedを返す
     */
    isImageWiderThanViewer(
        imageWidth: number,
        imageHeight: number,
    ): boolean | undefined;

    /** ピクセル値で指定した位置にスクロール */
    scrollToPx(x: number, y: number): void;

    /** 現在の位置からさらにピクセル値で指定した位置にスクロール */
    scrollByPx(x: number, y: number): void;

    /** パーセンテージで指定した位置にスクロール */
    scrollToPct(x: number, y: number): void;
}
