import * as ImageSize from "../../../../application/appState/imageSize";
import type { ScrollPercentage2D } from "../../../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../../../domain/models/viewer/viewerManager";

type Image = HTMLImageElement | undefined;
type Size = Readonly<{ width: number; height: number }>;

/* -------------------------------------------------------------------------- */

type DrawImagesOptions = Readonly<{
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  images: [Image, Image];
  imageSizeStore: ImageSize.ImageSizeStore;
  scrollPercentage2D: ScrollPercentage2D;
  viewerManager: ViewerManager;
}>;

/** Image要素をCanvasに描画 */
export const drawImages = (o: DrawImagesOptions): void => {
  // Canvasのstyleが変化した時に、
  // スクロール位置がズレることがある問題を解消するため処理を遅延させる
  // （Safariで発生する）
  window.setTimeout(() => {
    const imageSize = getImageSize(o.images);
    _drawImages(o.canvas, o.ctx, o.images, imageSize);
    o.imageSizeStore.set(ImageSize.create(imageSize));
    o.viewerManager.scrollToPercentage(o.scrollPercentage2D.x, o.scrollPercentage2D.y);
  }, 10);
};

/* -------------------------------------------------------------------------- */

const getImageSize = (images: [Image, Image]): Size => {
  return { width: getImageWidth(images), height: getImageHeight(images) };
};

const getImageWidth = (images: [Image, Image]): number => {
  return (images[0]?.width ?? 0) + (images[1]?.width ?? 0);
};

const getImageHeight = (images: [Image, Image]): number => {
  return Math.max(images[0]?.height ?? 0, images[1]?.height ?? 0);
};

/* -------------------------------------------------------------------------- */

const _drawImages = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  images: [Image, Image],
  imageSize: Size,
): void => {
  canvas.width = imageSize.width;
  canvas.height = imageSize.height;
  drawLeftImage(ctx, images);
  drawRightImage(ctx, images);
};

const drawLeftImage = (ctx: CanvasRenderingContext2D, images: [Image, Image]): void => {
  if (images[0] == null) return;
  ctx.drawImage(images[0], 0, 0);
};

const drawRightImage = (ctx: CanvasRenderingContext2D, images: [Image, Image]): void => {
  if (images[1] == null) return;
  ctx.drawImage(images[1], images[0]?.width ?? 0, 0);
};
