import {
  ImageSize,
  type ImageSizeStore,
} from "../../../../application/appState/valueObjects/imageSize";
import type { ScrollPercentage2D } from "../../../../domain/models/scroll/scrollPercentage2D";
import type { ViewerManager } from "../../../../domain/models/viewer/viewerManager";

type Image = HTMLImageElement | undefined;

/** Image要素をCanvasに描画 */
export const drawImages = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  images: [Image, Image],
  imageSizeStore: ImageSizeStore,
  scrollPercentage2D: ScrollPercentage2D,
  viewerManager: ViewerManager,
): void => {
  // Canvasのstyleが変化した時に発生する描画のチラつきと、
  // スクロール位置がズレる問題を解消するため処理を遅延させる
  window.setTimeout(() => {
    const width = imageWidth(images);
    const height = imageHeight(images);
    canvas.width = width;
    canvas.height = height;
    drawLeftImage(ctx, images);
    drawRightImage(ctx, images);
    viewerManager.scrollToPct(scrollPercentage2D.x, scrollPercentage2D.y);
    imageSizeStore.set(ImageSize.create({ width, height }));
  }, 10);
};

const imageWidth = (images: [Image, Image]): number => {
  return (images[0]?.width ?? 0) + (images[1]?.width ?? 0);
};

const imageHeight = (images: [Image, Image]): number => {
  return Math.max(images[0]?.height ?? 0, images[1]?.height ?? 0);
};

const drawLeftImage = (ctx: CanvasRenderingContext2D, images: [Image, Image]): void => {
  if (images[0] == null) return;
  ctx.drawImage(images[0], 0, 0);
};

const drawRightImage = (ctx: CanvasRenderingContext2D, images: [Image, Image]): void => {
  if (images[1] == null) return;
  ctx.drawImage(images[1], images[0]?.width ?? 0, 0);
};
