import { atom, useSetAtom } from "jotai";
import { BookX } from "lucide-react";
import type { JSX } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { closeViewer } from "../../../../application/viewer/closeViewer";
import type { UserSettingsStore } from "../../../../domain/models/userSettings/userSettingsStore";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom } from "../../../atoms";
import { LargeIconButton } from "../../utils/LargeIconButton";

const closeViewerAtom = atom(null, (get, set) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettingsStore: UserSettingsStore = {
        get: () => get(Atom.userSettings),
        set: (callback) =>
            set(Atom.userSettings, callback(get(Atom.userSettings))),
    };
    closeViewer(
        appStore,
        userSettingsStore,
        new LocalStorageUserSettingsRepository(),
    );
});

export const ViewerCloseButton = (): JSX.Element => {
    const closeViewer = useSetAtom(closeViewerAtom);

    return (
        <LargeIconButton text="本を閉じる" onClick={closeViewer}>
            <BookX className="size-8" />
        </LargeIconButton>
    );
};
