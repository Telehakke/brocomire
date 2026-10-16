import type { Cache } from "../../../../domain/models/file/cache";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import * as FileNavigator from "../../../../domain/models/file/fileNavigator";
import type { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../../../domain/models/userSettings/valueObjects/displayMode";

type Image = HTMLImageElement | undefined;

/* -------------------------------------------------------------------------- */

type GetImagesOptions = Readonly<{
  cache?: Cache;
  bookFormat: BookFormat;
  displayMode: DisplayMode;
  fileManager: FileManager;
  fileNavigator: FileNavigator.FileNavigator;
}>;

/**
 * 現在ページのImage要素を見開きで取得
 * @returns [leftImage, rightImage]
 */
export const getImages = async (o: GetImagesOptions): Promise<[Image, Image]> => {
  const leftIndex = FileNavigator.getLeftIndex(o.fileNavigator, o.bookFormat, o.displayMode);
  const rightIndex = FileNavigator.getRightIndex(o.fileNavigator, o.bookFormat, o.displayMode);
  return await Promise.all([
    getImage(await getBlob(o.fileManager, leftIndex, o.cache)),
    getImage(await getBlob(o.fileManager, rightIndex, o.cache)),
  ]);
};

/* -------------------------------------------------------------------------- */

const getBlob = async (
  fileManager: FileManager,
  index?: number,
  cache?: Cache,
): Promise<Blob | undefined> => {
  if (index == null) return undefined;
  return await fileManager.getBlob(index, cache);
};

const getImage = async (blob?: Blob): Promise<Image> => {
  return new Promise((resolve) => {
    if (blob == null) {
      resolve(undefined);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = (): void => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (): void => {
      URL.revokeObjectURL(url);
      resolve(undefined);
    };
    img.src = url;
  });
};
