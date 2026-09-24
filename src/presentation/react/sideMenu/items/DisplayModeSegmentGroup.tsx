import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import {
    DisplayMode,
    DisplayModeEnum,
} from "../../../../domain/models/userSettings/valueObjects/displayMode";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup } from "../../utils/SegmentGroup";

export const DisplayModeSegmentGroup = (): JSX.Element => {
    const displayMode = useAtomValue(UserSettingsAtom.displayMode);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleValueChange = (value: string | null): void => {
        setUserSettings((u) =>
            u.copyWith(
                { displayMode: DisplayMode.createSafe(value) },
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <SegmentGroup
            label="画像の表示数"
            items={Object.values(DisplayModeEnum)}
            value={displayMode.value}
            onValueChange={handleValueChange}
        />
    );
};
