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

export const create = (value: ImageSizeValue): ImageSize => {
  return value as ImageSize;
};

export const getStore = (
  getter: () => ImageSize,
  setter: (value: ImageSize) => void,
): ImageSizeStore => {
  return { get: () => getter(), set: (v) => setter(v) };
};
