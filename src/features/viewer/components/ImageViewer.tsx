import { atom, useSetAtom } from "jotai";
import { useRef, type JSX } from "react";
import { Atom } from "../../../atoms";
import type { ViewerBody, ViewerCanvas } from "../../../models/viewerManager";
import {
    moveToNextPageAtom,
    moveToPreviousPageAtom,
    zoomInAtom,
    zoomOutAtom,
} from "../actions/viewerActions";
import { BodyView } from "./sub/BodyView";
import { Content } from "./sub/Content";
import { GamepadMonitor } from "./sub/GamepadMonitor";
import { KeydownMonitor } from "./sub/KeydownMonitor";

/** 左側のページへ移動 */
const moveToLeftPageAtom = atom(null, (get, set) => {
    switch (get(Atom.appStore).writingType) {
        case "vertical":
            set(moveToNextPageAtom);
            break;
        case "horizontal":
            set(moveToPreviousPageAtom);
            break;
    }
});

/** 右側のページへ移動 */
const moveToRightPageAtom = atom(null, (get, set) => {
    switch (get(Atom.appStore).writingType) {
        case "vertical":
            set(moveToPreviousPageAtom);
            break;
        case "horizontal":
            set(moveToNextPageAtom);
            break;
    }
});

export const ImageViewer = (): JSX.Element => {
    const body = useRef<ViewerBody>(null);
    const canvas = useRef<ViewerCanvas>(null);
    const setViewerManager = useSetAtom(Atom.viewerManager);
    const setShouldShowInfo = useSetAtom(Atom.infoState);
    const zoomIn = useSetAtom(zoomInAtom);
    const zoomOut = useSetAtom(zoomOutAtom);
    const moveToLeftPage = useSetAtom(moveToLeftPageAtom);
    const moveToRightPage = useSetAtom(moveToRightPageAtom);

    return (
        <BodyView
            body={body}
            onResize={() => setViewerManager((v) => v.copyWith({}))}
            onClick={() => {
                setShouldShowInfo((v) => {
                    if (v === "visible") return "hidden";
                    return "visible";
                });
            }}
            onDoubleClick={zoomIn}
            onSubClick={zoomOut}
            onLeftSidePull={moveToLeftPage}
            onRightSidePull={moveToRightPage}
        >
            <Content canvas={canvas} />
            <GamepadMonitor />
            <KeydownMonitor />
        </BodyView>
    );
};
