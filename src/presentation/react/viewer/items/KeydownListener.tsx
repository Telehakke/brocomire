import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { KeydownMonitor } from "../../../../infrastructure/keyboard/keydownMonitor";
import { Atom } from "../../../atoms";

const getKeydownMonitorAtom = atom(null, (get, set) => {
    const appState = Atom.appState;
    const appStore: AppStore = {
        get: () => get(appState),
        set: (callback) => set(appState, callback(get(appState))),
    };
    return new KeydownMonitor(appStore, get(Atom.userSettings));
});

export const KeydownListener = (): null => {
    const getKeydownMonitor = useSetAtom(getKeydownMonitorAtom);

    useEffect(() => {
        const keydownMonitor = getKeydownMonitor();
        keydownMonitor.start();
        return (): void => keydownMonitor.end();
    }, [getKeydownMonitor]);

    return null;
};
