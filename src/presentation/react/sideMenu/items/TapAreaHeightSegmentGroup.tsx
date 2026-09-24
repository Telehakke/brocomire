import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import {
    TapAreaSizeEnum,
    type TapAreaSizeType,
} from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup } from "../../utils/SegmentGroup";

export const TapAreaHeightSegmentGroup = (): JSX.Element => {
    const tapAreaSize = useAtomValue(UserSettingsAtom.tapAreaSize);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleValueChange = (value: string | null): void => {
        setUserSettings((u) =>
            u.copyWith(
                {
                    tapAreaSize: u.tapAreaSize.copyWith({
                        height: value as TapAreaSizeType,
                    }),
                },
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <SegmentGroup
            label="下タップエリアの高さ"
            items={Object.values(TapAreaSizeEnum)}
            value={tapAreaSize.value.height}
            onValueChange={handleValueChange}
        />
    );
};
