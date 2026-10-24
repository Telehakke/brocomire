import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type CSSProperties, type JSX } from "react";
import { getImageSizeStore } from "../../../../application/appState/imageSize";
import type { IsImageWiderThanViewer } from "../../../../application/appState/isImageWiderThanViewer";
import type { IsLandscape } from "../../../../application/appState/isLandscape";
import { createIsLoading } from "../../../../application/appState/isLoading";
import type { OnSharpeningFilter } from "../../../../application/appState/onSharpeningFilter";
import { preloadFiles } from "../../../../application/file/preloadFiles";
import {
  getFileNavigatorStore,
  type FileNavigator,
} from "../../../../domain/models/file/fileNavigator";
import type { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import type { ContentFitValue } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import type { DisplayMode } from "../../../../domain/models/userSettings/valueObjects/displayMode";
import type { IsSafeAreaEnabled } from "../../../../domain/models/userSettings/valueObjects/isSafeAreaEnabled";
import {
  SAFE_AREA_LENGTH_MIN,
  type SafeAreaLength,
} from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import type { SharpeningFilterStrength } from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";
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

type Canvas = HTMLCanvasElement | null;
type Image = HTMLImageElement | undefined;

const getImagesAtom = atom(
  null,
  (get, _, bookFormat: BookFormat, displayMode: DisplayMode, fileNavigator: FileNavigator) => {
    const { shouldPreload } = get(Atom.userSettings);
    return getImages({
      cache: shouldPreload ? get(cacheAtom) : undefined,
      bookFormat,
      displayMode,
      fileManager: get(fileManagerAtom),
      fileNavigator,
    });
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
    onSharpeningFilter: OnSharpeningFilter,
    sharpeningFilterStrength: SharpeningFilterStrength,
  ) => {
    drawImages({
      canvas,
      ctx,
      fileNavigatorGetter: () => get(fileNavigatorAtom),
      images,
      imageSizeStore: getImageSizeStore(
        () => get(imageSizeAtom),
        (v) => set(imageSizeAtom, v),
      ),
      onSharpeningFilter,
      scrollPercentage2D: get(scrollPercentage2DAtom),
      sharpeningFilterStrength,
      viewerManager: get(viewerManagerAtom),
    });
  },
);

const preloadFilesAtom = atom(null, (get, set) => {
  preloadFiles({
    cache: get(cacheAtom),
    fileManager: get(fileManagerAtom),
    fileNavigatorStore: getFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    userSettingsGetter: () => get(Atom.userSettings),
  });
});

/* -------------------------------------------------------------------------- */

export const ViewerCanvas = (): JSX.Element => {
  const canvasRef = useRef<Canvas>(null);
  const timerId = useRef<number | undefined>(undefined);
  const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
  const contentFit = useAtomValue(UserSettingsAtom.contentFit);
  const displayMode = useAtomValue(UserSettingsAtom.displayMode);
  const fileNavigator = useAtomValue(fileNavigatorAtom);
  const isImageWiderThanViewer = useAtomValue(isImageWiderThanViewerAtom);
  const isLandscape = useAtomValue(isLandscapeAtom);
  const isSafeAreaEnabled = useAtomValue(UserSettingsAtom.isSafeAreaEnabled);
  const onSharpeningFilter = useAtomValue(onSharpeningFilterAtom);
  const safeAreaLength = useAtomValue(UserSettingsAtom.safeAreaLength);
  const sharpeningFilterStrength = useAtomValue(UserSettingsAtom.sharpeningFilterStrength);
  const viewerManager = useAtomValue(viewerManagerAtom);
  const drawImages = useSetAtom(drawImagesAtom);
  const getImages = useSetAtom(getImagesAtom);
  const preloadFiles = useSetAtom(preloadFilesAtom);
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

    void getImages(bookFormat, displayMode, fileNavigator).then((images) => {
      if (!isMounded) return;
      drawImages(canvas, ctx, images, onSharpeningFilter, sharpeningFilterStrength);
      preloadFiles();
      window.clearInterval(timerId.current);
      setIsLoading(createIsLoading(false));
    });
    return (): void => {
      isMounded = false;
      timerId.current = window.setTimeout(() => {
        setIsLoading(createIsLoading(true));
      }, 100);
    };
  }, [
    bookFormat, // メニューから書式の変更で再レンダリング
    displayMode, // メニューから画像の表示数の変更で再レンダリング
    drawImages,
    fileNavigator, // インデックスの変更で再レンダリング
    getImages,
    onSharpeningFilter, // 先鋭化フィルターの有効化・無効化で再レンダリング
    preloadFiles,
    setIsLoading,
    sharpeningFilterStrength, // 先鋭化フィルターの強度を変更で再レンダリング
  ]);

  return (
    <canvas
      //className={`m-auto ${sharpeningFilterClassName(onSharpeningFilter, isUserScrolling)}`}
      className="m-auto"
      style={{
        ...safeAriaStyle(isLandscape, isSafeAreaEnabled, safeAreaLength),
        ...canvasStyle(contentFit, isImageWiderThanViewer),
      }}
      ref={canvasRef}
    />
  );
};

/* -------------------------------------------------------------------------- */

const safeAriaStyle = (
  isLandscape: IsLandscape,
  isSafeAreaEnabled: IsSafeAreaEnabled,
  safeAreaLength: SafeAreaLength,
): CSSProperties => {
  if (!isSafeAreaEnabled) return {};
  if (isLandscape) return landscapeStyle(safeAreaLength);
  return portraitStyle(safeAreaLength);
};

const landscapeStyle = (safeAreaLength: SafeAreaLength): CSSProperties => {
  if (safeAreaLength === SAFE_AREA_LENGTH_MIN)
    return { ...safeAreaPaddingLeft(), ...safeAreaPaddingRight() };

  const value = `${safeAreaLength}px`;
  return { paddingLeft: value, paddingRight: value };
};

const portraitStyle = (safeAreaLength: SafeAreaLength): CSSProperties => {
  if (safeAreaLength === SAFE_AREA_LENGTH_MIN)
    return { ...safeAreaPaddingTop(), ...safeAreaPaddingBottom() };

  const value = `${safeAreaLength}px`;
  return { paddingTop: value, paddingBottom: value };
};

/* -------------------------------------------------------------------------- */

const canvasStyle = (
  contentFit: ContentFitValue,
  isImageWiderThanViewer: IsImageWiderThanViewer,
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
