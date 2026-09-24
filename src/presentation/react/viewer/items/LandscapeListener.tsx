import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { LandscapeMonitor } from "../../../../infrastructure/device/landscapeMonitor";
import { Atom } from "../../../atoms";

const getLandscapeMonitorAtom = atom(null, (get, set) => {
    const appState = Atom.appState;
    const appStore: AppStore = {
        get: () => get(appState),
        set: (callback) => set(appState, callback(get(appState))),
    };
    return new LandscapeMonitor(appStore);
});

export const LandscapeListener = (): null => {
    const getLandscapeMonitor = useSetAtom(getLandscapeMonitorAtom);

    useEffect(() => {
        const landscapeMonitor = getLandscapeMonitor();
        landscapeMonitor.runOnce();
        landscapeMonitor.start();
        return (): void => landscapeMonitor.end();
    }, [getLandscapeMonitor]);

    return null;
};
