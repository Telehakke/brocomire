import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import {
    BookFormat,
    BookFormatEnum,
} from "../../../../domain/models/userSettings/valueObjects/bookFormat";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { SegmentGroup } from "../../utils/SegmentGroup";

export const BookFormatSegmentGroup = (): JSX.Element => {
    const bookFormat = useAtomValue(UserSettingsAtom.bookFormat);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleValueChange = (value: string | null): void => {
        setUserSettings((u) =>
            u.copyWith(
                { bookFormat: BookFormat.createSafe(value) },
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <SegmentGroup
            label="書式"
            items={Object.values(BookFormatEnum)}
            value={bookFormat.value}
            onValueChange={handleValueChange}
        />
    );
};
