import { createEffect, onCleanup, onMount } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { type IsImageWiderThanViewer } from "../../../../application/appState/isImageWiderThanViewer";
import type { IsLandscape } from "../../../../application/appState/isLandscape";
import { createIsLoading } from "../../../../application/appState/isLoading";
import type { OnInvertLightness } from "../../../../application/appState/onInvertLightness";
import type { OnSharpeningFilter } from "../../../../application/appState/onSharpeningFilter";
import { preloadFiles } from "../../../../application/file/preloadFiles";
import { type FileNavigator } from "../../../../domain/models/file/fileNavigator";
import type { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import type { ContentFitValue } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import type { DisplayMode } from "../../../../domain/models/userSettings/valueObjects/displayMode";
import type { IsSafeAreaEnabled } from "../../../../domain/models/userSettings/valueObjects/isSafeAreaEnabled";
import {
  SAFE_AREA_LENGTH_MIN,
  type SafeAreaLength,
} from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import type { SharpeningFilterStrength } from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";
import {
  cacheSignal,
  fileManagerSignal,
  fileNavigatorSignal,
  imageSizeSignal,
  isImageWiderThanViewerSignal,
  isLandscapeSignal,
  isLoadingSignal,
  onInvertFilterSignal,
  onInvertLightnessSignal,
  onSharpeningFilterSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
} from "../../../signals";
import {
  safeAreaPaddingBottom,
  safeAreaPaddingLeft,
  safeAreaPaddingRight,
  safeAreaPaddingTop,
} from "../../utils/safeAreaPadding";
import { drawImages } from "../utils/drawImages";
import { getImages } from "../utils/getImages";

type Canvas = HTMLCanvasElement | undefined;
type Image = HTMLImageElement | undefined;

/* -------------------------------------------------------------------------- */

export const ViewerCanvas = (): JSX.Element => {
  // oxlint-disable-next-line no-unassigned-vars
  let canvasRef: Canvas;
  let timerId: number | undefined;
  const [fileNavigator] = fileNavigatorSignal;
  const [isImageWiderThanViewer, setIsImageWiderThanViewer] = isImageWiderThanViewerSignal;
  const [isLandscape] = isLandscapeSignal;
  const [, setIsLoading] = isLoadingSignal;
  const [onInvertFilter] = onInvertFilterSignal;
  const [onInvertLightness] = onInvertLightnessSignal;
  const [onSharpeningFilter] = onSharpeningFilterSignal;
  const [viewerManager] = viewerManagerSignal;
  const [userSettings] = userSettingsStore;

  onMount(() => {
    if (canvasRef == null) return;

    viewerManager().setCanvas(() => canvasRef);
  });

  createEffect(() => {
    let isMounded = true;
    const ctx = canvasRef?.getContext("2d");
    if (canvasRef == null || ctx == null) return;

    const onInvert = onInvertLightness();
    const onSharpening = onSharpeningFilter();
    const strength = userSettings.sharpeningFilterStrength;

    void runGetImages(userSettings.bookFormat, userSettings.displayMode, fileNavigator()).then(
      (images) => {
        if (!isMounded) return;
        runDrawImages(
          canvasRef,
          ctx,
          images,
          onInvert,
          onSharpening,
          setIsImageWiderThanViewer,
          strength,
        );
        runPreloadFiles();
        window.clearInterval(timerId);
        setIsLoading(createIsLoading(false));
      },
    );

    onCleanup(() => {
      isMounded = false;
      timerId = window.setTimeout(() => {
        setIsLoading(createIsLoading(true));
      }, 100);
    });
  });

  return (
    <canvas
      class={`m-auto ${onInvertFilter() ? "invert" : ""}`}
      style={{
        ...safeAriaStyle(
          isLandscape(),
          userSettings.isSafeAreaEnabled,
          userSettings.safeAreaLength,
        ),
        ...canvasStyle(userSettings.contentFit, isImageWiderThanViewer()),
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
): JSX.CSSProperties => {
  if (!isSafeAreaEnabled) return {};
  if (isLandscape) return landscapeStyle(safeAreaLength);
  return portraitStyle(safeAreaLength);
};

const landscapeStyle = (safeAreaLength: SafeAreaLength): JSX.CSSProperties => {
  if (safeAreaLength === SAFE_AREA_LENGTH_MIN)
    return { ...safeAreaPaddingLeft, ...safeAreaPaddingRight };

  const value = `${safeAreaLength}px`;
  return { "padding-left": value, "padding-right": value };
};

const portraitStyle = (safeAreaLength: SafeAreaLength): JSX.CSSProperties => {
  if (safeAreaLength === SAFE_AREA_LENGTH_MIN)
    return { ...safeAreaPaddingTop, ...safeAreaPaddingBottom };

  const value = `${safeAreaLength}px`;
  return { "padding-top": value, "padding-bottom": value };
};

/* -------------------------------------------------------------------------- */

const canvasStyle = (
  contentFit: ContentFitValue,
  isImageWiderThanViewer: IsImageWiderThanViewer,
): JSX.CSSProperties => {
  if (isImageWiderThanViewer == null)
    return { width: "100%", height: "100%", "object-fit": "contain" };
  return isImageWiderThanViewer ? canvasStyleMap[contentFit][0] : canvasStyleMap[contentFit][1];
};

const canvasStyleMap: Record<ContentFitValue, [JSX.CSSProperties, JSX.CSSProperties]> = {
  all: [
    { width: "100%", height: "auto" },
    { width: "auto", height: "100%" },
  ],
  fill: [
    { width: "auto", height: "100%" },
    { width: "100%", height: "auto" },
  ],
};

/* -------------------------------------------------------------------------- */

const runGetImages = (
  bookFormat: BookFormat,
  displayMode: DisplayMode,
  fileNavigator: FileNavigator,
): Promise<[Image, Image]> => {
  const [cache] = cacheSignal;
  const [fileManager] = fileManagerSignal;
  const [userSettings] = userSettingsStore;
  return getImages(
    userSettings.shouldPreload ? cache() : undefined,
    bookFormat,
    displayMode,
    fileManager(),
    fileNavigator,
  );
};

const runDrawImages = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  images: [Image, Image],
  onInvertLightness: OnInvertLightness,
  onSharpeningFilter: OnSharpeningFilter,
  setIsImageWiderThanViewer: (value: IsImageWiderThanViewer) => void,
  sharpeningFilterStrength: SharpeningFilterStrength,
): void => {
  const [, setImageSize] = imageSizeSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [viewerManager] = viewerManagerSignal;

  drawImages(
    canvas,
    ctx,
    images,
    (v) => setImageSize(v),
    onInvertLightness,
    onSharpeningFilter,
    setIsImageWiderThanViewer,
    scrollPercentage2D(),
    sharpeningFilterStrength,
    viewerManager(),
  );
};

const runPreloadFiles = (): void => {
  const [cache] = cacheSignal;
  const [fileManager] = fileManagerSignal;
  const [fileNavigator] = fileNavigatorSignal;
  const [userSettings] = userSettingsStore;

  preloadFiles(
    cache(),
    fileManager(),
    () => fileNavigator(),
    () => userSettings,
  );
};
