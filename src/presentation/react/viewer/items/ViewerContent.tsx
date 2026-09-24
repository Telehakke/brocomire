import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import type { ImageSize } from "../../../../application/appState/valueObjects/imageSize";
import type { ContentFit } from "../../../../domain/models/userSettings/valueObjects/contentFit";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import type { ViewerManager } from "../../../../domain/models/viewer/viewerManager";
import type { ZoomPct } from "../../../../domain/models/zoom/zoomPct";
import { AppStateAtom, Atom, UserSettingsAtom } from "../../../atoms";

const scrollAtom = atom(null, (get) => {
    const { scrollPct2D, viewerManager } = get(Atom.appState);
    viewerManager.scrollToPct(scrollPct2D.x, scrollPct2D.y);
});

export const ViewerContent = (props: { children: ReactNode }): JSX.Element => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const onInvertFilter = useAtomValue(AppStateAtom.onInvertFilter);
    const viewerManager = useAtomValue(AppStateAtom.viewerManager);
    const imageSize = useAtomValue(AppStateAtom.imageSize);
    const zoomPct = useAtomValue(AppStateAtom.zoomPct);
    const contentFit = useAtomValue(UserSettingsAtom.contentFit);
    const scroll = useSetAtom(scrollAtom);

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
            style={contentStyle(imageSize, zoomPct, contentFit, viewerManager)}
            ref={divRef}
        >
            {props.children}
        </div>
    );
};

const contentStyle = (
    imageSize: ImageSize,
    zoomPct: ZoomPct,
    contentFit: ContentFit,
    viewerManager: ViewerManager,
): CSSProperties | undefined => {
    const isImageWiderThanViewer = viewerManager.isImageWiderThanViewer(
        imageSize.value.width,
        imageSize.value.height,
    );
    if (isImageWiderThanViewer == null) {
        return { width: "100%", height: "100%" };
    }
    const scale = `${zoomPct.value}%`;
    switch (contentFit.value) {
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
            exhaustiveCheck(contentFit.value);
    }
};
