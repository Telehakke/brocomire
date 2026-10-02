import { atom, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import type { AppStore } from "../../../application/appState/appStore";
import { InfoVisibility } from "../../../application/appState/valueObjects/infoVisibility";
import { moveToLeftPage } from "../../../application/viewer/moveToLeftPage";
import { moveToRightPage } from "../../../application/viewer/moveToRightPage";
import { zoomIn } from "../../../application/viewer/zoomIn";
import { zoomOut } from "../../../application/viewer/zoomOut";
import { Atom } from "../../atoms";
import { ChevronLeft, ChevronRight } from "./items/ChevronIcons";
import { GamepadListener } from "./items/GamepadListener";
import { KeydownListener } from "./items/KeydownListener";
import { LandscapeListener } from "./items/LandscapeListener";
import { SharpeningFilter } from "./items/SharpeningFilter";
import { TapAreas } from "./items/TapAreas";
import { ViewerBody } from "./items/ViewerBody";
import { ViewerCanvas } from "./items/ViewerCanvas";
import { ViewerContent } from "./items/ViewerContent";

const zoomInAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    zoomIn(appStore, userSettings);
});

const zoomOutAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    zoomOut(appStore, userSettings);
});

const moveToLeftPageAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    moveToLeftPage(appStore, userSettings);
});

const moveToRightPageAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    moveToRightPage(appStore, userSettings);
});

export const ImageViewer = (): JSX.Element => {
    const setAppState = useSetAtom(Atom.appState);
    const zoomIn = useSetAtom(zoomInAtom);
    const zoomOut = useSetAtom(zoomOutAtom);
    const moveToLeftPage = useSetAtom(moveToLeftPageAtom);
    const moveToRightPage = useSetAtom(moveToRightPageAtom);

    const handleResize = (): void => {
        setAppState((a) => a.setViewerManager((v) => v.viewerManager.copy()));
    };

    const handleClick = (): void => {
        setAppState((a) =>
            a.setInfoVisibility(
                (v) =>
                    new InfoVisibility(
                        v.infoVisibility.value === "visible"
                            ? "hidden"
                            : "visible",
                    ),
            ),
        );
    };

    return (
        <>
            <SharpeningFilter.Component />
            <GamepadListener />
            <KeydownListener />
            <LandscapeListener />
            <ViewerBody
                onResize={handleResize}
                onClick={handleClick}
                onDoubleClick={zoomIn}
                onSubClick={zoomOut}
                onLeftSidePull={moveToLeftPage}
                onRightSidePull={moveToRightPage}
            >
                <ViewerContent>
                    <ViewerCanvas />
                </ViewerContent>
            </ViewerBody>
            <TapAreas />
            <ChevronLeft />
            <ChevronRight />
        </>
    );
};
