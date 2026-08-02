import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, type CSSProperties, type JSX, type RefObject } from "react";
import { AppStateAtom, Atom } from "../../../../atoms";
import type { ContentFit } from "../../../../models/appState";
import { FileManager } from "../../../../models/fileManager";
import type {
    ViewerCanvas,
    ViewerManager,
} from "../../../../models/viewerManager";
import {
    safeAreaPaddingBottom,
    safeAreaPaddingLeft,
    safeAreaPaddingRight,
    safeAreaPaddingTop,
} from "../../../../utils/safeAreaPadding";
import { SharpeningFilter } from "../SharpeningFilter";

type Image = HTMLImageElement | undefined;

/** 現在ページのImage要素を取得 */
const getImagesAtom = atom(
    null,
    async (get, _, fileManager: FileManager): Promise<Image[]> => {
        const appStore = get(Atom.appStore);
        const leftIndex = fileManager.getLeftIndex(appStore);
        const rightIndex = fileManager.getRightIndex(appStore);
        return await Promise.all(
            [leftIndex, rightIndex].map(async (v) =>
                getImage(await fileManager.getBlob(v)),
            ),
        );
    },
);

/** 次のページのBlobをキャッシュに保存 */
const cacheNextPageAtom = atom(null, (get, _, fileManager: FileManager) => {
    const appStore = get(Atom.appStore);
    const file = fileManager.nextIndex(appStore);
    const leftIndex = file.getLeftIndex(appStore);
    const rightIndex = file.getRightIndex(appStore);
    Promise.all(
        [leftIndex, rightIndex].map(async (v) =>
            getImage(await fileManager.getBlob(v)),
        ),
    );
});

/** Blobを読み込ませたImage要素を取得 */
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

/** 画像要素をCanvasに描画 */
const drawImagesAtom = atom(
    null,
    async (
        get,
        set,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        img1: Image,
        img2: Image,
    ) => {
        const width = (img1?.width ?? 0) + (img2?.width ?? 0);
        const height = Math.max(img1?.height ?? 0, img2?.height ?? 0);
        set(Atom.viewerManager, (v) => v.setImageSize({ width, height }));

        // Canvasのstyleが変化した時に発生する描画のチラつきと、
        // スクロール位置がズレる問題を解消するため処理を遅延させる
        window.setTimeout(() => {
            canvas.width = width;
            canvas.height = height;
            const img1Width = img1?.width ?? 0;
            if (img1 != null) {
                ctx.drawImage(img1, 0, 0);
                img1.src = "";
            }
            if (img2 != null) {
                ctx.drawImage(img2, img1Width, 0);
                img2.src = "";
            }
            get(Atom.scrollManager).applyScroll(get(Atom.viewerManager));
        }, 10);
    },
);

/* -------------------------------------------------------------------------- */

export const Canvas = ({
    canvas,
}: {
    canvas: RefObject<ViewerCanvas>;
}): JSX.Element => {
    const setViewerManager = useSetAtom(Atom.viewerManager);
    const getImages = useSetAtom(getImagesAtom);
    const drawImages = useSetAtom(drawImagesAtom);
    const cacheNextPage = useSetAtom(cacheNextPageAtom);
    const fileManager = useAtomValue(Atom.fileManager);
    const onSharpeningFilter = useAtomValue(AppStateAtom.onSharpeningFilter);
    const isSafeAreaEnabled = useAtomValue(AppStateAtom.isSafeAreaEnabled);
    const isLandscape = useAtomValue(Atom.isLandscape);
    const contentFit = useAtomValue(AppStateAtom.contentFit);
    const viewerManager = useAtomValue(Atom.viewerManager);

    useEffect(() => {
        setViewerManager((v) => v.setCanvas(canvas.current));
    }, [canvas, setViewerManager]);

    useEffect(() => {
        let isMounded = true;
        const el = canvas.current;
        const ctx = el?.getContext("2d");
        if (el == null || ctx == null) return;

        getImages(fileManager).then(([img1, img2]) => {
            if (!isMounded) return;
            drawImages(el, ctx, img1, img2);
            cacheNextPage(fileManager);
        });
        return (): void => {
            isMounded = false;
        };
    }, [canvas, drawImages, fileManager, getImages, cacheNextPage]);

    return (
        <canvas
            className={`m-auto ${onSharpeningFilter ? SharpeningFilter.className : ""}`}
            style={{
                ...safeAriaStyle(isSafeAreaEnabled, isLandscape),
                ...canvasStyle(contentFit, viewerManager),
            }}
            ref={canvas}
        />
    );
};

const safeAriaStyle = (
    isSafeAreaEnabled: boolean,
    isLandscape: boolean,
): CSSProperties => {
    if (!isSafeAreaEnabled) return {};
    if (isLandscape) {
        return { ...safeAreaPaddingLeft(), ...safeAreaPaddingRight() };
    }
    return { ...safeAreaPaddingTop(), ...safeAreaPaddingBottom() };
};

const canvasStyle = (
    contentFit: ContentFit,
    viewerManager: ViewerManager,
): CSSProperties => {
    if (viewerManager.isImageWiderThanViewer() == null) {
        return { width: "100%", height: "100%", objectFit: "contain" };
    }
    switch (contentFit) {
        case "all":
            return {
                width: viewerManager.isImageWiderThanViewer() ? "100%" : "auto",
                height: viewerManager.isImageWiderThanViewer()
                    ? "auto"
                    : "100%",
            };
        case "fill":
            return {
                width: viewerManager.isImageWiderThanViewer() ? "auto" : "100%",
                height: viewerManager.isImageWiderThanViewer()
                    ? "100%"
                    : "auto",
            };
    }
};
