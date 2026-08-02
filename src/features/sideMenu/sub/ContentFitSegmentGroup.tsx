import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { AppStateAtom, Atom } from "../../../atoms";
import { SegmentGroup } from "../../../components/SegmentGroup";
import { ContentFitEnum, type ContentFit } from "../../../models/appState";

export const ContentFitSegmentGroup = (): JSX.Element => {
    const contentFit = useAtomValue(AppStateAtom.contentFit);
    const setAppStore = useSetAtom(Atom.appStore);

    return (
        <SegmentGroup
            label="コンテンツフィット"
            items={Object.values(ContentFitEnum)}
            value={contentFit}
            onValueChange={(v) => {
                setAppStore((a) => a.setContentFit(v as ContentFit));
            }}
        />
    );
};
