import { atom, useAtomValue, useSetAtom } from "jotai";
import { type JSX } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { handleBottomEdgeClick } from "../../../../application/viewer/handleBottomEdgeClick";
import { handleBottomEdgeSubClick } from "../../../../application/viewer/handleBottomEdgeSubClick";
import { handleLeftEdgeClick } from "../../../../application/viewer/handleLeftEdgeClick";
import { handleLeftEdgeSubClick } from "../../../../application/viewer/handleLeftEdgeSubClick";
import { handleRightEdgeClick } from "../../../../application/viewer/handleRightEdgeClick";
import { handleRightEdgeSubClick } from "../../../../application/viewer/handleRightEdgeSubClick";
import { scrollByXPct } from "../../../../application/viewer/scrollByXPct";
import { scrollByYPct } from "../../../../application/viewer/scrollByYPct";
import { TapAreaSizeEnum } from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { TapArea } from "./TapArea";

const handleLeftEdgeClickAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    handleLeftEdgeClick(appStore, userSettings);
});

const handleLeftEdgeSubClickAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    handleLeftEdgeSubClick(appStore, userSettings);
});

const handleRightEdgeClickAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    handleRightEdgeClick(appStore, userSettings);
});

const handleRightEdgeSubClickAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    handleRightEdgeSubClick(appStore, userSettings);
});

const handleBottomEdgeClickAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    handleBottomEdgeClick(appStore, userSettings);
});

const handleBottomEdgeSubClickAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    handleBottomEdgeSubClick(appStore, userSettings);
});

const handleVerticalScrollAtom = atom(null, (get, set, amount: number) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    scrollByYPct(amount, appStore, userSettings);
});

const handleHorizontalScrollAtom = atom(null, (get, set, amount: number) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    scrollByXPct(amount, appStore, userSettings);
});

export const TapAreas = (): JSX.Element => {
    const tapAreaSize = useAtomValue(UserSettingsAtom.tapAreaSize);
    const handleLeftEdgeClick = useSetAtom(handleLeftEdgeClickAtom);
    const handleLeftEdgeSubClick = useSetAtom(handleLeftEdgeSubClickAtom);
    const handleRightEdgeClick = useSetAtom(handleRightEdgeClickAtom);
    const handleRightEdgeSubClick = useSetAtom(handleRightEdgeSubClickAtom);
    const handleBottomEdgeClick = useSetAtom(handleBottomEdgeClickAtom);
    const handleBottomEdgeSubClick = useSetAtom(handleBottomEdgeSubClickAtom);
    const handleVerticalScroll = useSetAtom(handleVerticalScrollAtom);
    const handleHorizontalScroll = useSetAtom(handleHorizontalScrollAtom);

    return (
        <>
            <TapArea
                className="inset-x-0 bottom-0"
                style={{
                    height: TapAreaSizeEnum[tapAreaSize.value.height].length,
                }}
                onClick={handleBottomEdgeClick}
                onSubClick={handleBottomEdgeSubClick}
                onScroll={(deltaX) => handleHorizontalScroll(deltaX)}
            />
            <TapArea
                className="inset-y-0 left-0"
                style={{
                    width: TapAreaSizeEnum[tapAreaSize.value.width].length,
                }}
                onClick={handleLeftEdgeClick}
                onSubClick={handleLeftEdgeSubClick}
                onScroll={(_, deltaY) => handleVerticalScroll(deltaY)}
            />
            <TapArea
                className="inset-y-0 right-0"
                style={{
                    width: TapAreaSizeEnum[tapAreaSize.value.width].length,
                }}
                onClick={handleRightEdgeClick}
                onSubClick={handleRightEdgeSubClick}
                onScroll={(_, deltaY) => handleVerticalScroll(deltaY)}
            />
        </>
    );
};
