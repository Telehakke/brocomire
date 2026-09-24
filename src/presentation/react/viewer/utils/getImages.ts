import type { Cache } from "../../../../domain/models/file/cache";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import type { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import type { DisplayMode } from "../../../../domain/models/userSettings/valueObjects/displayMode";

type Image = HTMLImageElement | undefined;

/**
 * 現在ページのImage要素を見開きで取得
 * @returns [leftImage, rightImage]
 */
export const getImages = async (
    bookFormat: BookFormat,
    displayMode: DisplayMode,
    fileManager: FileManager,
    cache?: Cache,
): Promise<[Image, Image]> => {
    const leftIndex = fileManager.getLeftIndex(bookFormat, displayMode);
    const rightIndex = fileManager.getRightIndex(bookFormat, displayMode);
    return await Promise.all([
        getImage(await getBlob(fileManager, leftIndex, cache)),
        getImage(await getBlob(fileManager, rightIndex, cache)),
    ]);
};

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
        img.onload = (): void => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = (): void => {
            URL.revokeObjectURL(url);
            resolve(undefined);
        };
        const url = URL.createObjectURL(blob);
        img.src = url;
    });
};
