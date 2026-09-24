import type { JSX } from "react/jsx-runtime";
import { ImageFilesOpenButton } from "../file/ImageFileOpenButtons";
import { ZipFileOpenButton } from "../file/ZipFileOpenButtons copy";

export const Home = (): JSX.Element => {
    const className = {
        _: "m-auto w-max",
        position: "fixed inset-x-0 top-1/2 -translate-y-1/2",
        grid: "grid grid-cols-2 place-items-center gap-4",
    };

    return (
        <>
            <div className={Object.values(className).join(" ")}>
                <ImageFilesOpenButton />
                <ZipFileOpenButton />
            </div>
            <p className="fixed bottom-8 left-8">v0.260924a</p>
        </>
    );
};
