type ImageSizeValue = Readonly<{
  width: number;
  height: number;
}>;

declare const ImageSizeBrand: unique symbol;

export type ImageSize = ImageSizeValue & { [ImageSizeBrand]: unknown };

export type ImageSizeSetter = (value: ImageSize) => void;

/* -------------------------------------------------------------------------- */

export const createImageSize = (width: number, height: number): ImageSize => {
  return { width, height } as ImageSize;
};
