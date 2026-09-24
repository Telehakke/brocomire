import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState, type JSX } from "react";
import type { AppStore } from "../../../../application/appState/appStore";
import { handleThumbnailClick } from "../../../../application/sideMenu/handleThumbnailClick";
import type { FileManager } from "../../../../domain/models/file/fileManager";
import { BookFormat } from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import { AppStateAtom, Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SelectPageSlider = (): JSX.Element => {
    const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);

    return <Container key={bookFormat.value} />;
};

const Container = (): JSX.Element => {
    const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
    const fileManager = useAtomValue(AppStateAtom.fileManager);
    const [blob, setBlob] = useState<Blob | undefined>(undefined);
    const [index, setIndex] = useState(
        helper(bookFormat).correctIndex(fileManager.getIndex(), fileManager),
    );

    return (
        <div>
            <PageSlider index={index} setIndex={setIndex} setBlob={setBlob} />
            <Thumbnail blob={blob} index={index} />
        </div>
    );
};

const PageSlider = (props: {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    setBlob: React.Dispatch<React.SetStateAction<Blob | undefined>>;
}): JSX.Element => {
    const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
    const fileManager = useAtomValue(AppStateAtom.fileManager);

    const handleValueChangedEnd = async (value: number): Promise<void> => {
        props.setBlob(
            await fileManager.getBlob(
                helper(bookFormat).correctIndex(value, fileManager),
            ),
        );
    };

    return (
        <Slider
            label={(v) => helper(bookFormat).sliderLabel(v, fileManager)}
            origin={helper(bookFormat).sliderOrigin()}
            min={0}
            max={fileManager.size() - 1}
            value={props.index}
            onValueChange={props.setIndex}
            onValueChangeEnd={handleValueChangedEnd}
        />
    );
};

type Image = HTMLImageElement | null;

const handleThumbnailClickAtom = atom(null, (get, set, index: number) => {
    const appStore: AppStore = {
        get: () => get(Atom.appState),
        set: (callback) => set(Atom.appState, callback(get(Atom.appState))),
    };
    const userSettings = get(Atom.userSettings);
    handleThumbnailClick(index, appStore, userSettings);
});

const Thumbnail = (props: {
    blob?: Blob;
    index: number;
}): JSX.Element | null => {
    const imageRef = useRef<Image>(null);
    const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
    const fileManager = useAtomValue(AppStateAtom.fileManager);
    const handleThumbnailClick = useSetAtom(handleThumbnailClickAtom);

    const createURL = (blob?: Blob): string | undefined => {
        if (blob == null) return undefined;
        return URL.createObjectURL(blob);
    };

    const loadImage = (image: Image, imageURL?: string): void => {
        if (image == null || imageURL == null) return;
        image.src = imageURL;
    };

    const unloadImage = (image: Image, imageURL?: string): void => {
        if (image == null || imageURL == null) return;
        image.src = "";
        URL.revokeObjectURL(imageURL);
    };

    useEffect(() => {
        const image = imageRef.current;
        const imageURL = createURL(props.blob);
        loadImage(image, imageURL);
        return (): void => unloadImage(image, imageURL);
    }, [props.blob]);

    if (props.blob == null) return null;
    return (
        <img
            className="m-auto max-h-50 max-w-50"
            ref={imageRef}
            onClick={() => {
                handleThumbnailClick(
                    helper(bookFormat).correctIndex(props.index, fileManager),
                );
            }}
        />
    );
};

/* -------------------------------------------------------------------------- */

type BookFormatFuncs = {
    /** 書式に応じた正確なインデックスを返す */
    correctIndex: (value: number, fileManager: FileManager) => number;
    /** スライダーのラベル */
    sliderLabel: (value: number, fileManager: FileManager) => string;
    /** スライダーの原点 */
    sliderOrigin: () => "start" | "end";
};

const horizontalFuncs: BookFormatFuncs = {
    correctIndex(value) {
        return value;
    },
    sliderLabel(value, fileManager) {
        return `ページ：${value + 1} / ${fileManager.size()}`;
    },
    sliderOrigin() {
        return "start";
    },
};

const verticalFuncs: BookFormatFuncs = {
    correctIndex(value, fileManager) {
        return fileManager.size() - value - 1;
    },
    sliderLabel(value, fileManager) {
        return `ページ：${fileManager.size() - value} / ${fileManager.size()}`;
    },
    sliderOrigin() {
        return "end";
    },
};

const helper = (bookFormat: BookFormat): BookFormatFuncs => {
    switch (bookFormat.value) {
        case "horizontal":
            return horizontalFuncs;
        case "vertical":
            return verticalFuncs;
        default:
            exhaustiveCheck(bookFormat.value);
            throw new Error();
    }
};
