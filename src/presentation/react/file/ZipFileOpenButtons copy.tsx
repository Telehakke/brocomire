import { atom, useSetAtom } from "jotai";
import { FileArchive } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import type { AppStore } from "../../../application/appState/appStore";
import { openZipFile } from "../../../application/file/openZipFile";
import type { UserSettingsStore } from "../../../domain/models/userSettings/userSettingsStore";
import { ZipFileManager } from "../../../infrastructure/file/zipFileManager";
import { Atom } from "../../atoms";
import { FileOpenButton } from "./FileOpenButtons";

const openZipFileAtom = atom(null, async (get, set, file: File) => {
    const fileManager = await ZipFileManager.create(file);
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettingsStore: UserSettingsStore = {
        get: () => get(Atom.userSettings),
        set: (callback) =>
            set(Atom.userSettings, callback(get(Atom.userSettings))),
    };
    openZipFile(file.name, fileManager, appStore, userSettingsStore);
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
