import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState, type JSX } from "react";
import { AppStateAtom, Atom } from "../../../atoms";
import { Slider } from "../../../components/Slider";
import type { WritingType } from "../../../models/appState";
import type { FileManager } from "../../../models/fileManager";
import { moveToIndexPageAtom } from "../../viewer/actions/viewerActions";

export const SelectPageSlider = (): JSX.Element => {
    const writingType = useAtomValue(AppStateAtom.writingType);

    return <Part key={writingType} />;
};

/* -------------------------------------------------------------------------- */

const Part = (): JSX.Element => {
    const writingType = useAtomValue(AppStateAtom.writingType);
    const fileManager = useAtomValue(Atom.fileManager);
    const [index, setIndex] = useState(
        correctIndex(writingType, fileManager, fileManager.index),
    );
    const [blob, setBlob] = useState<Blob | undefined>(undefined);

    return (
        <div>
            <Slider
                label={(v) =>
                    `ページ：${correctIndex(writingType, fileManager, v) + 1} / ${fileManager.length}`
                }
                origin={writingType === "vertical" ? "end" : "start"}
                min={0}
                max={fileManager.length - 1}
                value={index}
                onValueChange={setIndex}
                onValueChangeEnd={async (v) => {
                    setBlob(
                        await fileManager.getBlob(
                            correctIndex(writingType, fileManager, v),
                            false,
                        ),
                    );
                }}
            />
            <Thumbnail
                blob={blob}
                index={correctIndex(writingType, fileManager, index)}
            />
        </div>
    );
};

const correctIndex = (
    writingType: WritingType,
    fileManager: FileManager,
    index: number,
): number => {
    switch (writingType) {
        case "vertical":
            return fileManager.length - index - 1;
        case "horizontal":
            return index;
    }
};

/* -------------------------------------------------------------------------- */

const handleThumbnailClickAtom = atom(null, (_, set, index: number) => {
    set(moveToIndexPageAtom, index);
    set(Atom.zoomManager, (z) => z.reset());
    set(Atom.isOpenSideMenu, false);
});

const Thumbnail = (props: { blob?: Blob; index: number }): JSX.Element => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const handleThumbnailClick = useSetAtom(handleThumbnailClickAtom);

    useEffect(() => {
        const image = imageRef.current;
        if (image == null || props.blob == null) return;

        const imageURL = URL.createObjectURL(props.blob);
        image.src = imageURL;
        return (): void => {
            URL.revokeObjectURL(imageURL);
            image.src = "";
        };
    }, [props.blob]);

    if (props.blob == null) return <></>;
    return (
        <img
            className="m-auto max-h-50 max-w-50"
            ref={imageRef}
            onClick={() => {
                handleThumbnailClick(props.index);
            }}
        />
    );
};
