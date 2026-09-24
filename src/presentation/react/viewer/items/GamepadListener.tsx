import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { GamepadMonitor } from "../../../../infrastructure/gamepad/gamepadMonitor";
import { Atom } from "../../../atoms";

const getGamepadMonitorAtom = atom(null, (get, set) => {
    const appState = Atom.appState;
    const appStore: AppStore = {
        get: () => get(appState),
        set: (callback) => set(appState, callback(get(appState))),
    };
    return new GamepadMonitor(appStore, get(Atom.userSettings));
});

export const GamepadListener = (): null => {
    const getGamepadMonitor = useSetAtom(getGamepadMonitorAtom);

    useEffect(() => {
        const gamepadMonitor = getGamepadMonitor();
        gamepadMonitor.start();
        return (): void => gamepadMonitor.end();
    }, [getGamepadMonitor]);

    return null;
};
