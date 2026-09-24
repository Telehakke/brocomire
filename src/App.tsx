import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, type JSX } from "react";
import { updateHistory } from "./application/viewer/updateHistory";
import type { UserSettingsStore } from "./domain/models/userSettings/userSettingsStore";
import { LocalStorageUserSettingsRepository } from "./infrastructure/userSettings/localStorageUserSettingsRepository";
import { AppStateAtom, Atom } from "./presentation/atoms";
import { Home } from "./presentation/react/home/Home";
import { Menu } from "./presentation/react/menu/Menu";
import { NotificationView } from "./presentation/react/notification/NotificationView";
import { SideMenu } from "./presentation/react/sideMenu/SideMenu";
import { ImageViewer } from "./presentation/react/viewer/ImageViewer";

const updateHistoryAtom = atom(null, (get, set) => {
    const appState = get(Atom.appState);
    const userSettingsStore: UserSettingsStore = {
        get: () => get(Atom.userSettings),
        set: (callback) =>
            set(Atom.userSettings, callback(get(Atom.userSettings))),
    };
    updateHistory(
        appState,
        userSettingsStore,
        new LocalStorageUserSettingsRepository(),
    );
});

export const App = (): JSX.Element => {
    const userSettings = useSetAtom(Atom.userSettings);
    const updateHistory = useSetAtom(updateHistoryAtom);
    const onViewer = useAtomValue(AppStateAtom.onViewer);

    useEffect(() => {
        userSettings(new LocalStorageUserSettingsRepository().load());
    }, [userSettings]);

    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            // ブラウザが最小化されたら履歴を更新
            if (document.hidden) {
                updateHistory();
            }
        });
    }, [updateHistory]);

    if (!onViewer) return <Home />;
    return (
        <>
            <ImageViewer />
            <SideMenu />
            <Menu />
            <NotificationView />
        </>
    );
};
