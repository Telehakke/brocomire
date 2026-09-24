import type {
    ViewerBodyProperties,
    ViewerCanvasProperties,
    ViewerManager,
} from "../../domain/models/viewer/viewerManager";

export class ImageViewerManager implements ViewerManager {
    private body: (() => ViewerBodyProperties) | undefined;
    private canvas: (() => ViewerCanvasProperties) | undefined;

    constructor(
        body?: () => ViewerBodyProperties,
        canvas?: () => ViewerCanvasProperties,
    ) {
        this.body = body;
        this.canvas = canvas;
    }

    setBody(body: () => ViewerBodyProperties): ViewerManager {
        return new ImageViewerManager(body, this.canvas);
    }

    setCanvas(canvas: () => ViewerCanvasProperties): ViewerManager {
        return new ImageViewerManager(this.body, canvas);
    }

    copy(): ViewerManager {
        return new ImageViewerManager(this.body, this.canvas);
    }

    scrollXPct(): number | undefined {
        const maxScrollX = this.maxScrollXPx();
        if (this.body == null || maxScrollX <= 0) return undefined;
        // 限界までスクロールしても`scrollLeft / maxScrollX = 1`にならない場合があるので、
        // Math.ceil()で小数点以下切り上げ
        return (Math.ceil(this.body().scrollLeft) / maxScrollX) * 100;
    }

    scrollYPct(): number | undefined {
        const maxScrollY = this.maxScrollYPx();
        if (this.body == null || maxScrollY <= 0) return undefined;
        // 限界までスクロールしても`scrollTop / maxScrollY = 1`にならない場合があるので、
        // Math.ceil()で小数点以下切り上げ
        return (Math.ceil(this.body().scrollTop) / maxScrollY) * 100;
    }

    canScrollX(): boolean {
        return this.maxScrollXPx() > 0;
    }

    canScrollY(): boolean {
        return this.maxScrollYPx() > 0;
    }

    private maxScrollXPx(): number {
        if (this.body == null || this.canvas == null) return 0;
        return this.canvas().clientWidth - this.body().clientWidth;
    }

    private maxScrollYPx(): number {
        if (this.body == null || this.canvas == null) return 0;
        return this.canvas().clientHeight - this.body().clientHeight;
    }

    isReachedLimitX(): boolean {
        const x = this.scrollXPct() ?? 0;
        return x <= 0 || x >= 100;
    }

    isImageWiderThanViewer(
        imageWidth: number,
        imageHeight: number,
    ): boolean | undefined {
        if (
            this.body == null ||
            this.body().clientHeight === 0 ||
            imageHeight === 0
        )
            return undefined;
        const bodyRatio = this.body().clientWidth / this.body().clientHeight;
        const imageRatio = imageWidth / imageHeight;
        return bodyRatio <= imageRatio;
    }

    scrollToPx(x: number, y: number): void {
        this.body?.().scroll(x, y);
    }

    scrollByPx(x: number, y: number): void {
        this.body?.().scroll(
            this.body().scrollLeft + x,
            this.body().scrollTop + y,
        );
    }

    scrollToPct(x: number, y: number): void {
        const x1 = (this.maxScrollXPx() * x) / 100;
        const y1 = (this.maxScrollYPx() * y) / 100;
        this.body?.().scroll(x1, y1);
    }
}
