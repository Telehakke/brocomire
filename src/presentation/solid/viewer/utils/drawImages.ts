import { createImageSize, type ImageSizeSetter } from "../../../../application/appState/imageSize";
import {
  createIsImageWiderThanViewer,
  type IsImageWiderThanViewer,
} from "../../../../application/appState/isImageWiderThanViewer";
import type { OnInvertLightness } from "../../../../application/appState/onInvertLightness";
import type { OnSharpeningFilter } from "../../../../application/appState/onSharpeningFilter";
import { scroll } from "../../../../application/viewer/scroll";
import type { ScrollPercentage2D } from "../../../../domain/models/scroll/scrollPercentage2D";
import type { SharpeningFilterStrength } from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";
import type { ViewerManager } from "../../../../domain/models/viewer/viewerManager";
import { invertLightnessWebGL } from "./invertLightnessWebGL";
import { sharpenCanvasWebGL } from "./sharpenCanvasWebGL";

type Image = HTMLImageElement | undefined;
type Size = Readonly<{ width: number; height: number }>;

/* -------------------------------------------------------------------------- */

/** Image要素をCanvasに描画 */
export const drawImages = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  images: [Image, Image],
  imageSizeSetter: ImageSizeSetter,
  onInvertLightness: OnInvertLightness,
  onSharpeningFilter: OnSharpeningFilter,
  setIsImageWiderThanViewer: (value: IsImageWiderThanViewer) => void,
  scrollPercentage2D: ScrollPercentage2D,
  sharpeningFilterStrength: SharpeningFilterStrength,
  viewerManager: ViewerManager,
): void => {
  const imageSize = getImageSize(images);
  _drawImages(canvas, ctx, images, imageSize);
  if (onInvertLightness) invertLightnessWebGL(canvas, ctx);
  if (onSharpeningFilter) sharpenCanvasWebGL(canvas, ctx, sharpeningFilterStrength);
  imageSizeSetter(createImageSize(imageSize.width, imageSize.height));
  scroll(scrollPercentage2D, viewerManager);
  setIsImageWiderThanViewer(
    createIsImageWiderThanViewer(
      viewerManager.isImageWiderThanViewer(imageSize.width, imageSize.height),
    ),
  );
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
