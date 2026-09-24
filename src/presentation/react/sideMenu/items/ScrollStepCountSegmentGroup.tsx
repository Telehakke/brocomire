import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import {
    ScrollStepCount,
    ScrollStepCountEnum,
} from "../../../../domain/models/userSettings/valueObjects/scrollStepCount";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup } from "../../utils/SegmentGroup";

export const ScrollStepCountSegmentGroup = (): JSX.Element => {
    const scrollStepCount = useAtomValue(UserSettingsAtom.scrollStepCount);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleValueChange = (value: string | null): void => {
        setUserSettings((u) =>
            u.copyWith(
                { scrollStepCount: ScrollStepCount.createSafe(value) },
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <SegmentGroup
            label="スクロールステップ数"
            items={Object.values(ScrollStepCountEnum)}
            value={scrollStepCount.value}
            onValueChange={handleValueChange}
        />
    );
};
