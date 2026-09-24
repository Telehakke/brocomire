import { atom, useSetAtom } from "jotai";
import { FileImage } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import type { AppStore } from "../../../application/appState/appStore";
import { openImageFiles } from "../../../application/file/openImageFiles";
import { ImageFileManger } from "../../../infrastructure/file/imageFileManager";
import { Atom } from "../../atoms";
import { FileOpenButton } from "./FileOpenButtons";

const openImageFilesAtom = atom(null, (get, set, files: File[]) => {
    const fileManager = ImageFileManger.create(files);
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    openImageFiles(fileManager, appStore, get(Atom.userSettings));
});

export const ImageFilesOpenButton = (): JSX.Element => {
    const openImageFiles = useSetAtom(openImageFilesAtom);

    const handleChange = (
        ev: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ): void => {
        const files = ev.currentTarget.files;
        if (files == null) return;
        openImageFiles(Array.from(files));
        ev.currentTarget.value = "";
    };

    return (
        <FileOpenButton
            text="画像ファイルを開く"
            accept="image/*"
            multiple
            onChange={handleChange}
        >
            <FileImage className="size-8" />
        </FileOpenButton>
    );
};
