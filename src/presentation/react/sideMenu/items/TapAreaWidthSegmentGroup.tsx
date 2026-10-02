import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import {
    TapAreaSizeEnum,
    type TapAreaSizeType,
} from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup } from "../../utils/SegmentGroup";

export const TapAreaWidthSegmentGroup = (): JSX.Element => {
    const tapAreaSize = useAtomValue(UserSettingsAtom.tapAreaSize);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleValueChange = (value: string | null): void => {
        setUserSettings((u) =>
            u.setTapAreaSize(
                (v) =>
                    v.tapAreaSize.copyWith({ width: value as TapAreaSizeType }),
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <SegmentGroup
            label="左右タップエリアの幅"
            items={Object.values(TapAreaSizeEnum)}
            value={tapAreaSize.value.width}
            onValueChange={handleValueChange}
        />
    );
};
