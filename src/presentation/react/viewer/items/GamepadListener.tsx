import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { GamepadMonitor } from "../../../../infrastructure/gamepad/gamepadMonitor";
import { Atom } from "../../../atoms";

export const GamepadListener = (): null => {
    const [appState, setAppState] = useAtom(Atom.appState);
    const userSettings = useAtomValue(Atom.userSettings);

    useEffect(() => {
        const appStore: AppStore = {
            get: () => appState,
            set: (callback) => setAppState(callback(appState)),
        };
        const gamepadMonitor = new GamepadMonitor(appStore, userSettings);
        gamepadMonitor.start();
        return (): void => gamepadMonitor.end();
    }, [appState, setAppState, userSettings]);

    return null;
};
