import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { AppStateAtom, Atom } from "../../../atoms";
import { SegmentGroup } from "../../../components/SegmentGroup";
import {
    TapAreaLengthEnum,
    type TapAreaLength,
} from "../../../models/appState";

export const TapAreaWidthSegmentGroup = (): JSX.Element => {
    const tapAreaWidth = useAtomValue(AppStateAtom.tapAreaWidth);
    const setAppStore = useSetAtom(Atom.appStore);

    return (
        <SegmentGroup
            label="左右タップエリアの幅"
            items={Object.values(TapAreaLengthEnum)}
            value={tapAreaWidth}
            onValueChange={(v) =>
                setAppStore((a) => a.setTapAreaWidth(v as TapAreaLength))
            }
        />
    );
};
