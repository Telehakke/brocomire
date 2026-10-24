type ImageSizeValue = Readonly<{
  width: number;
  height: number;
}>;

declare const ImageSizeBrand: unique symbol;

export type ImageSize = ImageSizeValue & { [ImageSizeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type ImageSizeStore = Readonly<{
  get(): ImageSize;
  set(value: ImageSize): void;
}>;

/* -------------------------------------------------------------------------- */

export const createImageSize = (width: number, height: number): ImageSize => {
  return { width, height } as ImageSize;
};

export const getImageSizeStore = (
  getter: () => ImageSize,
  setter: (value: ImageSize) => void,
): ImageSizeStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
