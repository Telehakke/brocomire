import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import type { IsImageWiderThanViewer } from "../../../../application/appState/isImageWiderThanViewer";
import { scroll } from "../../../../application/viewer/scroll";
import type { ContentFitValue } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import type { ZoomPercentage } from "../../../../domain/models/zoom/zoomPercentage";
import {
  contentFitAtom,
  isImageWiderThanViewerAtom,
  scrollPercentage2DAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../../atoms";

const scrollAtom = atom(null, (get) => {
  scroll(get(scrollPercentage2DAtom), get(viewerManagerAtom));
});

/* -------------------------------------------------------------------------- */

export const ViewerContent = (props: { children: ReactNode }): JSX.Element => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const contentFit = useAtomValue(contentFitAtom);
  const isImageWiderThanViewer = useAtomValue(isImageWiderThanViewerAtom);
  const zoomPercentage = useAtomValue(zoomPercentageAtom);
  const scroll = useSetAtom(scrollAtom);

  useEffect(() => {
    const div = divRef.current;
    if (div == null) return;

    // 拡大・縮小されるとスクロールする
    const observer = new MutationObserver(scroll);
    observer.observe(div, { attributeFilter: ["style"] });
    return (): void => observer.disconnect();
  }, [scroll]);

  return (
    <div
      className="flex"
      style={contentStyle(contentFit, isImageWiderThanViewer, zoomPercentage)}
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
): CSSProperties => {
  if (isImageWiderThanViewer == null) return { width: "100%", height: "100%" };

  const styleMap = getContentStyleMap(zoomPercentage);
  return isImageWiderThanViewer ? styleMap[contentFit][0] : styleMap[contentFit][1];
};

const getContentStyleMap = (
  zoomPercentage: ZoomPercentage,
): Record<ContentFitValue, [CSSProperties, CSSProperties]> => {
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
