import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import {
    ContentFit,
    ContentFitEnum,
} from "../../../../domain/models/userSettings/valueObjects/contentFit";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup } from "../../utils/SegmentGroup";

export const ContentFitSegmentGroup = (): JSX.Element => {
    const contentFit = useAtomValue(UserSettingsAtom.contentFit);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleValueChange = (value: string | null): void => {
        setUserSettings((u) =>
            u.setContentFit(
                () => ContentFit.createSafe(value),
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <SegmentGroup
            label="コンテンツフィット"
            items={Object.values(ContentFitEnum)}
            value={contentFit.value}
            onValueChange={handleValueChange}
        />
    );
};
