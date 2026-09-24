import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { KeydownMonitor } from "../../../../infrastructure/keyboard/keydownMonitor";
import { Atom } from "../../../atoms";

export const KeydownListener = (): null => {
    const [appState, setAppState] = useAtom(Atom.appState);
    const userSettings = useAtomValue(Atom.userSettings);

    useEffect(() => {
        const appStore: AppStore = {
            get: () => appState,
            set: (callback) => setAppState(callback(appState)),
        };
        const keydownMonitor = new KeydownMonitor(appStore, userSettings);
        keydownMonitor.start();
        return (): void => keydownMonitor.end();
    }, [appState, setAppState, userSettings]);

    return null;
};
