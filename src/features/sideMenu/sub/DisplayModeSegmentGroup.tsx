import { atom, useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { AppStateAtom, Atom } from "../../../atoms";
import { SegmentGroup } from "../../../components/SegmentGroup";
import { DisplayModeEnum, type DisplayMode } from "../../../models/appState";
import { moveToIndexPageAtom } from "../../viewer/actions/viewerActions";

const reloadAtom = atom(null, (get, set, value: DisplayMode) => {
    set(Atom.appStore, (a) => a.setDisplayMode(value));
    const index = get(Atom.fileManager).index;
    set(moveToIndexPageAtom, index);
});

export const DisplayModeSegmentGroup = (): JSX.Element => {
    const displayMode = useAtomValue(AppStateAtom.displayMode);
    const reload = useSetAtom(reloadAtom);

    return (
        <SegmentGroup
            label="画像の表示枚数"
            items={Object.values(DisplayModeEnum)}
            value={displayMode}
            onValueChange={(v) => reload(v as DisplayMode)}
        />
    );
};
