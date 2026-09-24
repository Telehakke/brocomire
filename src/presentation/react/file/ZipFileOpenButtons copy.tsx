import { atom, useSetAtom } from "jotai";
import { FileArchive } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import type { AppStore } from "../../../application/appState/appStore";
import { openZipFile } from "../../../application/file/openZipFile";
import type { UserSettingsStore } from "../../../domain/models/userSettings/userSettingsStore";
import { ZipFileManager } from "../../../infrastructure/file/zipFileManager";
import { LocalStorageUserSettingsRepository } from "../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom } from "../../atoms";
import { FileOpenButton } from "./FileOpenButtons";

const openZipFileAtom = atom(null, async (get, set, file: File) => {
    const fileManager = await ZipFileManager.create(file);
    const appState = Atom.appState;
    const appStore: AppStore = {
        get: () => get(appState),
        set: (callback) => set(appState, callback(get(appState))),
    };
    const userSettings = Atom.userSettings;
    const userSettingsStore: UserSettingsStore = {
        get: () => get(userSettings),
        set: (callback) => set(userSettings, callback(get(userSettings))),
    };
    openZipFile(
        file.name,
        fileManager,
        appStore,
        userSettingsStore,
        new LocalStorageUserSettingsRepository(),
    );
});

export const ZipFileOpenButton = (): JSX.Element => {
    const openZipFile = useSetAtom(openZipFileAtom);

    const handleChange = (
        ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ): void => {
        const file = ev.currentTarget.files?.[0];
        if (file == null) return;
        openZipFile(file);
        ev.currentTarget.value = "";
    };

    return (
        <FileOpenButton
            text="Zipファイルを開く"
            accept=".zip"
            onChange={handleChange}
        >
            <FileArchive className="size-8" />
        </FileOpenButton>
    );
};
