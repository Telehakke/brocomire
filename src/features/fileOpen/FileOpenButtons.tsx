import { useSetAtom } from "jotai";
import { FileArchive, FileImage } from "lucide-react";
import { useRef, type ChangeEvent, type ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import { LargeIconButton } from "../../components/LargeIconButton";
import { openImageFileAtom, openZipFileAtom } from "./fileOpenActions";

export const ImageFilesOpenButton = (): JSX.Element => {
    const openImageFiles = useSetAtom(openImageFileAtom);

    return (
        <FileOpenButton
            text="画像ファイルを開く"
            accept="image/*"
            multiple
            onChange={(ev) => {
                const files = ev.currentTarget.files;
                if (files == null) return;
                openImageFiles(Array.from(files));
                ev.currentTarget.value = "";
            }}
        >
            <FileImage className="size-8" />
        </FileOpenButton>
    );
};

export const ZipFileOpenButton = (): JSX.Element => {
    const openZipFile = useSetAtom(openZipFileAtom);

    return (
        <FileOpenButton
            text="Zipファイルを開く"
            accept=".zip"
            onChange={(ev) => {
                const file = ev.currentTarget.files?.[0];
                if (file == null) return;
                openZipFile(file);
                ev.currentTarget.value = "";
            }}
        >
            <FileArchive className="size-8" />
        </FileOpenButton>
    );
};

const FileOpenButton = (props: {
    text: string;
    accept: string;
    multiple?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
    children: ReactNode;
}): JSX.Element => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                accept={props.accept}
                multiple={props.multiple}
                onChange={props.onChange}
            />
            <LargeIconButton
                text={props.text}
                onClick={() => inputRef.current?.click()}
            >
                {props.children}
            </LargeIconButton>
        </>
    );
};
