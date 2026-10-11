import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import type { ContentFit } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import type { ZoomPercentage } from "../../../../domain/models/zoom/zoomPercentage";
import {
  isImageWiderThanViewerAtom,
  onInvertFilterAtom,
  scrollPercentage2DAtom,
  UserSettingsAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../../atoms";

const scrollAtom = atom(null, (get) => {
  const scrollPct2D = get(scrollPercentage2DAtom);
  get(viewerManagerAtom).scrollToPct(scrollPct2D.x, scrollPct2D.y);
});

export const ViewerContent = (props: { children: ReactNode }): JSX.Element => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const onInvertFilter = useAtomValue(onInvertFilterAtom);
  const zoomPercentage = useAtomValue(zoomPercentageAtom);
  const contentFit = useAtomValue(UserSettingsAtom.contentFit);
  const scroll = useSetAtom(scrollAtom);
  const isImageWiderThanViewer = useAtomValue(isImageWiderThanViewerAtom);

  useEffect(() => {
    const div = divRef.current;
    if (div == null) return;

    const observer = new MutationObserver(() => {
      scroll(); // 拡大・縮小されるとスクロールする
    });
    observer.observe(div, { attributeFilter: ["style"] });
    return (): void => observer.disconnect();
  }, [scroll]);

  return (
    <div
      className={`flex ${onInvertFilter ? "invert" : ""}`}
      style={contentStyle(contentFit, isImageWiderThanViewer, zoomPercentage)}
      ref={divRef}
    >
      {props.children}
    </div>
  );
};

const contentStyle = (
  contentFit: ContentFit,
  isImageWiderThanViewer: boolean | undefined,
  zoomPercentage: ZoomPercentage,
): CSSProperties | undefined => {
  if (isImageWiderThanViewer == null) return { width: "100%", height: "100%" };

  const scale = `${zoomPercentage}%`;
  switch (contentFit) {
    case "all":
      return {
        width: isImageWiderThanViewer ? scale : "100%",
        height: isImageWiderThanViewer ? "100%" : scale,
      };
    case "fill":
      return {
        width: isImageWiderThanViewer ? "100%" : scale,
        height: isImageWiderThanViewer ? scale : "100%",
      };
    default:
      exhaustiveCheck(contentFit);
  }
};
