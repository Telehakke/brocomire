import type {
  ViewerBodyProperties,
  ViewerCanvasProperties,
  ViewerManager,
} from "../../domain/models/viewer/viewerManager";

export class ImageViewerManager implements ViewerManager {
  private body: (() => ViewerBodyProperties) | undefined;
  private canvas: (() => ViewerCanvasProperties) | undefined;

  constructor(body?: () => ViewerBodyProperties, canvas?: () => ViewerCanvasProperties) {
    this.body = body;
    this.canvas = canvas;
  }

  setBody(body: () => ViewerBodyProperties): void {
    this.body = body;
  }

  setCanvas(canvas: () => ViewerCanvasProperties): void {
    this.canvas = canvas;
  }

  getScrollXPercentage(): number | undefined {
    const maxScrollX = this.getMaxScrollX();
    if (this.body == null || maxScrollX === 0) return undefined;
    // 限界までスクロールしても`scrollLeft / maxScrollX = 1`にならない場合があるので、
    // Math.ceil()で小数点以下切り上げ
    return (Math.ceil(this.body().scrollLeft) / maxScrollX) * 100;
  }

  getScrollYPercentage(): number | undefined {
    const maxScrollY = this.getMaxScrollY();
    if (this.body == null || maxScrollY === 0) return undefined;
    // 限界までスクロールしても`scrollTop / maxScrollY = 1`にならない場合があるので、
    // Math.ceil()で小数点以下切り上げ
    return (Math.ceil(this.body().scrollTop) / maxScrollY) * 100;
  }

  canScrollX(): boolean {
    return this.getMaxScrollX() > 0;
  }

  canScrollY(): boolean {
    return this.getMaxScrollY() > 0;
  }

  private getMaxScrollX(): number {
    if (this.body == null || this.canvas == null) return 0;
    return Math.max(this.canvas().clientWidth - this.body().clientWidth, 0);
  }

  private getMaxScrollY(): number {
    if (this.body == null || this.canvas == null) return 0;
    return Math.max(this.canvas().clientHeight - this.body().clientHeight, 0);
  }

  isReachedLimitX(): boolean {
    const x = this.getScrollXPercentage() ?? 0;
    return x <= 0 || 100 <= x;
  }

  isImageWiderThanViewer(imageWidth: number, imageHeight: number): boolean | undefined {
    if (this.body == null || this.body().clientHeight === 0 || imageHeight === 0) return undefined;
    const bodyRatio = this.body().clientWidth / this.body().clientHeight;
    const imageRatio = imageWidth / imageHeight;
    return bodyRatio <= imageRatio;
  }

  scrollByPx(x: number, y: number): void {
    const body = this.body?.();
    body?.scroll(body.scrollLeft + x, body.scrollTop + y);
  }

  scrollToPercentage(x: number, y: number): void {
    const x1 = (this.getMaxScrollX() * x) / 100;
    const y1 = (this.getMaxScrollY() * y) / 100;
    this.body?.().scroll(x1, y1);
  }
}
