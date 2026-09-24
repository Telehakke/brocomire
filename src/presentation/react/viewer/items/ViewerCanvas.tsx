import { atom, useAtomValue, useSetAtom } from "jotai";
import { LoaderCircle } from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type JSX,
} from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import type { ImageSize } from "../../../../application/appState/valueObjects/imageSize";
import { preloadFiles } from "../../../../application/file/preloadFiles";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import type { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import type { ContentFit } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import type { DisplayMode } from "../../../../domain/models/userSettings/valueObjects/displayMode";
import type { ViewerManager } from "../../../../domain/models/viewer/viewerManager";
import { AppStateAtom, Atom, UserSettingsAtom } from "../../../atoms";
import {
    safeAreaPaddingBottom,
    safeAreaPaddingLeft,
    safeAreaPaddingRight,
    safeAreaPaddingTop,
} from "../../utils/safeAreaPadding";
import { drawImages } from "../utils/drawImages";
import { getImages } from "../utils/getImages";
import { SharpeningFilter } from "./SharpeningFilter";

type Canvas = HTMLCanvasElement | null;
type Image = HTMLImageElement | undefined;

const getImagesAtom = atom(
    null,
    (
        get,
        _,
        bookFormat: BookFormat,
        displayMode: DisplayMode,
        fileManager: FileManager,
    ) => {
        const { cache } = get(Atom.appState);
        const { shouldPreload } = get(Atom.userSettings);
        return getImages(
            bookFormat,
            displayMode,
            fileManager,
            shouldPreload.value ? cache : undefined,
        );
    },
);

const drawImagesAtom = atom(
    null,
    (
        get,
        set,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        images: [Image, Image],
    ) => {
        const appStore: AppStore = {
            get: () => get(Atom.appState),
            set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
        };
        drawImages(canvas, ctx, images, appStore);
    },
);

const preloadFilesAtom = atom(null, (get) => {
    const appState = get(Atom.appState);
    const userSettings = get(Atom.userSettings);
    preloadFiles(appState, userSettings);
});

export const ViewerCanvas = (): JSX.Element => {
    const canvasRef = useRef<Canvas>(null);
    const setAppState = useSetAtom(Atom.appState);
    const getImages = useSetAtom(getImagesAtom);
    const drawImages = useSetAtom(drawImagesAtom);
    const preloadFiles = useSetAtom(preloadFilesAtom);
    const fileManager = useAtomValue(AppStateAtom.fileManager);
    const imageSize = useAtomValue(AppStateAtom.imageSize);
    const isLandscape = useAtomValue(AppStateAtom.isLandscape);
    const onSharpeningFilter = useAtomValue(AppStateAtom.onSharpeningFilter);
    const viewerManager = useAtomValue(AppStateAtom.viewerManager);
    const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
    const contentFit = useAtomValue(UserSettingsAtom.contentFit);
    const displayMode = useAtomValue(UserSettingsAtom.displayMode);
    const isSafeAreaEnabled = useAtomValue(UserSettingsAtom.isSafeAreaEnabled);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas == null) return;
        setAppState((a) =>
            a.copyWith({
                viewerManager: a.viewerManager.setCanvas(() => canvas),
            }),
        );
    }, [setAppState]);

    useEffect(() => {
        let isMounded = true;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas == null || ctx == null) return;

        getImages(bookFormat, displayMode, fileManager).then((images) => {
            if (!isMounded) return;
            drawImages(canvas, ctx, images);
            preloadFiles();
            setIsLoading(false);
        });
        return (): void => {
            isMounded = false;
            setIsLoading(true);
        };
    }, [
        bookFormat, // メニューから書式の変更で再レンダリング
        preloadFiles,
        displayMode, // メニューから画像の表示数の変更で再レンダリング
        drawImages,
        fileManager, // ページの変更で再レンダリング
        getImages,
        setAppState,
    ]);

    return (
        <>
            <canvas
                className={`m-auto ${onSharpeningFilter ? SharpeningFilter.className : ""}`}
                style={{
                    ...safeAriaStyle(isSafeAreaEnabled.value, isLandscape),
                    ...canvasStyle(imageSize, contentFit, viewerManager),
                }}
                ref={canvasRef}
            />
            {isLoading && (
                <LoaderCircle className="fixed inset-0 m-auto inline size-16 animate-spin stroke-green-500" />
            )}
        </>
    );
};

const safeAriaStyle = (
    isSafeAreaEnabled: boolean,
    isLandscape: boolean,
): CSSProperties => {
    if (!isSafeAreaEnabled) return {};
    if (isLandscape)
        return {
            ...safeAreaPaddingLeft(),
            ...safeAreaPaddingRight(),
        };
    return {
        ...safeAreaPaddingTop(),
        ...safeAreaPaddingBottom(),
    };
};

const canvasStyle = (
    imageSize: ImageSize,
    contentFit: ContentFit,
    viewerManager: ViewerManager,
): CSSProperties => {
    const isImageWiderThanViewer = viewerManager.isImageWiderThanViewer(
        imageSize.value.width,
        imageSize.value.height,
    );
    if (isImageWiderThanViewer == null) {
        return { width: "100%", height: "100%", objectFit: "contain" };
    }
    switch (contentFit.value) {
        case "all":
            return {
                width: isImageWiderThanViewer ? "100%" : "auto",
                height: isImageWiderThanViewer ? "auto" : "100%",
            };
        case "fill":
            return {
                width: isImageWiderThanViewer ? "auto" : "100%",
                height: isImageWiderThanViewer ? "100%" : "auto",
            };
    }
};
