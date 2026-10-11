import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type CSSProperties, type JSX } from "react";
import { ImageSize } from "../../../../application/appState/valueObjects/imageSize";
import { preloadFiles } from "../../../../application/file/preloadFiles";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import { FileNavigator } from "../../../../domain/models/file/fileNavigator";
import type { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import type { ContentFit } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import type { DisplayMode } from "../../../../domain/models/userSettings/valueObjects/displayMode";
import { SafeAreaLength } from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import {
  Atom,
  cacheAtom,
  fileManagerAtom,
  fileNavigatorAtom,
  imageSizeAtom,
  isImageWiderThanViewerAtom,
  isLandscapeAtom,
  isLoadingAtom,
  onSharpeningFilterAtom,
  scrollPercentage2DAtom,
  UserSettingsAtom,
  viewerManagerAtom,
} from "../../../atoms";
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
    fileNavigator: FileNavigator,
  ) => {
    const { shouldPreload } = get(Atom.userSettings);
    return getImages(
      bookFormat,
      displayMode,
      fileManager,
      fileNavigator,
      shouldPreload ? get(cacheAtom) : undefined,
    );
  },
);

const drawImagesAtom = atom(
  null,
  (get, set, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, images: [Image, Image]) => {
    const imageSizeStore = ImageSize.getStore(
      () => get(imageSizeAtom),
      (v) => set(imageSizeAtom, v),
    );
    drawImages(
      canvas,
      ctx,
      images,
      imageSizeStore,
      get(scrollPercentage2DAtom),
      get(viewerManagerAtom),
    );
  },
);

const preloadFilesAtom = atom(null, (get, set) => {
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const userSettings = get(Atom.userSettings);
  preloadFiles(userSettings, get(cacheAtom), get(fileManagerAtom), fileNavigatorStore);
});

export const ViewerCanvas = (): JSX.Element => {
  const canvasRef = useRef<Canvas>(null);
  const timerId = useRef<number | undefined>(undefined);
  const getImages = useSetAtom(getImagesAtom);
  const drawImages = useSetAtom(drawImagesAtom);
  const preloadFiles = useSetAtom(preloadFilesAtom);
  const fileNavigator = useAtomValue(fileNavigatorAtom);
  const isLandscape = useAtomValue(isLandscapeAtom);
  const onSharpeningFilter = useAtomValue(onSharpeningFilterAtom);
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
  const contentFit = useAtomValue(UserSettingsAtom.contentFit);
  const displayMode = useAtomValue(UserSettingsAtom.displayMode);
  const isSafeAreaEnabled = useAtomValue(UserSettingsAtom.isSafeAreaEnabled);
  const safeAreaLength = useAtomValue(UserSettingsAtom.safeAreaLength);
  const viewerManager = useAtomValue(viewerManagerAtom);
  const fileManager = useAtomValue(fileManagerAtom);
  const isImageWiderThanViewer = useAtomValue(isImageWiderThanViewerAtom);
  const setIsLoading = useSetAtom(isLoadingAtom);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    viewerManager.setCanvas(() => canvas);
  }, [viewerManager]);

  useEffect(() => {
    let isMounded = true;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas == null || ctx == null) return;

    void getImages(bookFormat, displayMode, fileManager, fileNavigator).then((images) => {
      if (!isMounded) return;
      drawImages(canvas, ctx, images);
      preloadFiles();
      window.clearInterval(timerId.current);
      setIsLoading(false);
    });
    return (): void => {
      isMounded = false;
      timerId.current = window.setTimeout(() => {
        setIsLoading(true);
      }, 100);
    };
  }, [
    bookFormat, // メニューから書式の変更で再レンダリング
    preloadFiles,
    displayMode, // メニューから画像の表示数の変更で再レンダリング
    drawImages,
    fileManager,
    fileNavigator, // インデックスの変更で再レンダリング
    getImages,
    setIsLoading,
  ]);

  return (
    <canvas
      className={`m-auto ${onSharpeningFilter ? SharpeningFilter.className : ""}`}
      style={{
        ...safeAriaStyle(isSafeAreaEnabled, isLandscape, safeAreaLength),
        ...canvasStyle(contentFit, isImageWiderThanViewer),
      }}
      ref={canvasRef}
    />
  );
};

const safeAriaStyle = (
  isSafeAreaEnabled: boolean,
  isLandscape: boolean,
  safeAreaLength: SafeAreaLength,
): CSSProperties => {
  if (!isSafeAreaEnabled) return {};
  if (isLandscape) return landscapeStyle(safeAreaLength);
  return portraitStyle(safeAreaLength);
};

const landscapeStyle = (safeAreaLength: SafeAreaLength): CSSProperties => {
  if (SafeAreaLength.isMin(safeAreaLength))
    return { ...safeAreaPaddingLeft(), ...safeAreaPaddingRight() };
  const value = `${safeAreaLength}px`;
  return { paddingLeft: value, paddingRight: value };
};

const portraitStyle = (safeAreaLength: SafeAreaLength): CSSProperties => {
  if (SafeAreaLength.isMin(safeAreaLength))
    return { ...safeAreaPaddingTop(), ...safeAreaPaddingBottom() };
  const value = `${safeAreaLength}px`;
  return { paddingTop: value, paddingBottom: value };
};

const canvasStyle = (
  contentFit: ContentFit,
  isImageWiderThanViewer: boolean | undefined,
): CSSProperties => {
  if (isImageWiderThanViewer == null)
    return { width: "100%", height: "100%", objectFit: "contain" };

  switch (contentFit) {
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
    default:
      exhaustiveCheck(contentFit);
      throw new Error();
  }
};
