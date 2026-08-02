import { atom, useSetAtom } from "jotai";
import { BookX } from "lucide-react";
import type { JSX } from "react";
import { Atom } from "../../../atoms";
import { LargeIconButton } from "../../../components/LargeIconButton";
import { FileManager } from "../../../models/fileManager";
import { updateHistoryAtom } from "../../viewer/actions/viewerActions";

const closeViewerAtom = atom(null, (_, set) => {
    set(updateHistoryAtom);
    set(Atom.fileManager, new FileManager());
    set(Atom.fullscreenManager, (f) => f.exit());
    set(Atom.isOpenSideMenu, false);
    set(Atom.zipFileName, undefined);
    set(Atom.zoomManager, (z) => z.reset());
    set(Atom.onViewer, false);
});

export const CloseButton = (): JSX.Element => {
    const closeViewer = useSetAtom(closeViewerAtom);

    return (
        <LargeIconButton text="本を閉じる" onClick={closeViewer}>
            <BookX className="size-8" />
        </LargeIconButton>
    );
};
