type ImageSizeType = Readonly<{
  width: number;
  height: number;
}>;

declare const ImageSizeBrand: unique symbol;

export type ImageSize = ImageSizeType & { [ImageSizeBrand]: unknown };

/* -------------------------------------------------------------------------- */

export type ImageSizeStore = Readonly<{
  get(): ImageSize;

  set(value: ImageSize): void;
}>;

/* -------------------------------------------------------------------------- */

export const ImageSize = {
  create(value: ImageSizeType): ImageSize {
    return value as ImageSize;
  },

  equals(v1: ImageSize, v2: ImageSize): boolean {
    return v1.width === v2.width && v1.height === v2.height;
  },

  getStore(getter: () => ImageSize, setter: (value: ImageSize) => void): ImageSizeStore {
    return { get: () => getter(), set: (v) => setter(v) };
  },
} as const;
