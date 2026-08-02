import { atom, useAtomValue, useSetAtom } from "jotai";
import {
    useEffect,
    useRef,
    type CSSProperties,
    type JSX,
    type RefObject,
} from "react";
import { AppStateAtom, Atom } from "../../../../atoms";
import type { ContentFit } from "../../../../models/appState";
import type {
    ViewerCanvas,
    ViewerManager,
} from "../../../../models/viewerManager";
import { ZoomManager } from "../../../../models/zoomManager";
import { Canvas } from "./Canvas";

const applyScrollAtom = atom(null, (get) => {
    get(Atom.scrollManager).applyScroll(get(Atom.viewerManager));
});

export const Content = ({
    canvas,
}: {
    canvas: RefObject<ViewerCanvas>;
}): JSX.Element => {
    const div = useRef<HTMLDivElement | null>(null);
    const onInvertFilter = useAtomValue(Atom.onInvertFilter);
    const viewerManager = useAtomValue(Atom.viewerManager);
    const zoomManager = useAtomValue(Atom.zoomManager);
    const applyScroll = useSetAtom(applyScrollAtom);
    const contentFit = useAtomValue(AppStateAtom.contentFit);

    useEffect(() => {
        if (div.current == null) return;

        const observer = new MutationObserver(() => {
            applyScroll(); // 拡大・縮小されるとスクロールする
        });
        observer.observe(div.current, { attributeFilter: ["style"] });
        return (): void => observer.disconnect();
    }, [applyScroll]);

    return (
        <div
            className={`flex ${onInvertFilter ? "invert" : ""}`}
            style={contentStyle(zoomManager, contentFit, viewerManager)}
            ref={div}
        >
            <Canvas canvas={canvas} />
        </div>
    );
};

const contentStyle = (
    zoomManager: ZoomManager,
    contentFit: ContentFit,
    viewerManager: ViewerManager,
): CSSProperties => {
    const scale = `${zoomManager.scale}%`;
    if (viewerManager.isImageWiderThanViewer() == null) {
        return { width: "100%", height: "100%" };
    }
    switch (contentFit) {
        case "all":
            return {
                width: viewerManager.isImageWiderThanViewer() ? scale : "100%",
                height: viewerManager.isImageWiderThanViewer() ? "100%" : scale,
            };
        case "fill":
            return {
                width: viewerManager.isImageWiderThanViewer() ? "100%" : scale,
                height: viewerManager.isImageWiderThanViewer() ? scale : "100%",
            };
    }
};
