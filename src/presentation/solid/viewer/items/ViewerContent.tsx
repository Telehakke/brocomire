import { createEffect } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import type { IsImageWiderThanViewer } from "../../../../application/appState/isImageWiderThanViewer";
import { scroll } from "../../../../application/viewer/scroll";
import type { ContentFitValue } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import type { ZoomPercentage } from "../../../../domain/models/zoom/zoomPercentage";
import {
  isImageWiderThanViewerSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
  zoomPercentageSignal,
} from "../../../signals";

export const ViewerContent = (props: { children: JSX.Element }): JSX.Element => {
  // oxlint-disable-next-line no-unassigned-vars
  let divRef: HTMLDivElement | undefined;
  const [isImageWiderThanViewer] = isImageWiderThanViewerSignal;
  const [userSettings] = userSettingsStore;
  const [zoomPercentage] = zoomPercentageSignal;

  createEffect(() => {
    if (divRef == null) return;

    // 拡大・縮小されるとスクロールする
    const observer = new MutationObserver(runScroll);
    observer.observe(divRef, { attributeFilter: ["style"] });
    return (): void => observer.disconnect();
  });

  return (
    <div
      class="flex"
      style={contentStyle(userSettings.contentFit, isImageWiderThanViewer(), zoomPercentage())}
      ref={divRef}
    >
      {props.children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */

const contentStyle = (
  contentFit: ContentFitValue,
  isImageWiderThanViewer: IsImageWiderThanViewer,
  zoomPercentage: ZoomPercentage,
): JSX.CSSProperties => {
  if (isImageWiderThanViewer == null) return { width: "100%", height: "100%" };

  const styleMap = getContentStyleMap(zoomPercentage);
  return isImageWiderThanViewer ? styleMap[contentFit][0] : styleMap[contentFit][1];
};

const getContentStyleMap = (
  zoomPercentage: ZoomPercentage,
): Record<ContentFitValue, [JSX.CSSProperties, JSX.CSSProperties]> => {
  const scale = `${zoomPercentage}%`;
  return {
    all: [
      { width: scale, height: "100%" },
      { width: "100%", height: scale },
    ],
    fill: [
      { width: "100%", height: scale },
      { width: scale, height: "100%" },
    ],
  };
};

/* -------------------------------------------------------------------------- */

const runScroll = (): void => {
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [viewerManager] = viewerManagerSignal;

  scroll(scrollPercentage2D(), viewerManager());
};
