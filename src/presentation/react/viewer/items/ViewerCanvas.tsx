import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type CSSProperties, type JSX } from "react";
import * as ImageSize from "../../../../application/appState/imageSize";
import type { IsImageWiderThanViewer } from "../../../../application/appState/isImageWiderThanViewer";
import type { IsLandscape } from "../../../../application/appState/isLandscape";
import * as IsLoading from "../../../../application/appState/isLoading";
import type { OnSharpeningFilter } from "../../../../application/appState/onSharpeningFilter";
import { preloadFiles } from "../../../../application/file/preloadFiles";
import * as FileNavigator from "../../../../domain/models/file/fileNavigator";
import type { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import type { ContentFitValue } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import type { DisplayMode } from "../../../../domain/models/userSettings/valueObjects/displayMode";
import type { IsSafeAreaEnabled } from "../../../../domain/models/userSettings/valueObjects/isSafeAreaEnabled";
import * as SafeAreaLength from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
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
  (
    get,
    _,
    bookFormat: BookFormat,
    displayMode: DisplayMode,
    fileNavigator: FileNavigator.FileNavigator,
  ) => {
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
      imageSizeStore: ImageSize.getStore(
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
    fileNavigatorStore: FileNavigator.getStore(
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
      setIsLoading(IsLoading.create(false));
    });
    return (): void => {
      isMounded = false;
      timerId.current = window.setTimeout(() => {
        setIsLoading(IsLoading.create(true));
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
  safeAreaLength: SafeAreaLength.SafeAreaLength,
): CSSProperties => {
  if (!isSafeAreaEnabled) return {};
  if (isLandscape) return landscapeStyle(safeAreaLength);
  return portraitStyle(safeAreaLength);
};

const landscapeStyle = (safeAreaLength: SafeAreaLength.SafeAreaLength): CSSProperties => {
  if (SafeAreaLength.isMin(safeAreaLength))
    return { ...safeAreaPaddingLeft(), ...safeAreaPaddingRight() };

  const value = `${safeAreaLength}px`;
  return { paddingLeft: value, paddingRight: value };
};

const portraitStyle = (safeAreaLength: SafeAreaLength.SafeAreaLength): CSSProperties => {
  if (SafeAreaLength.isMin(safeAreaLength))
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
