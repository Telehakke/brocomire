import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { ShouldAdvance } from "../../../../domain/models/userSettings/valueObjects/shouldAdvance";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldAdvanceSwitch = (): JSX.Element => {
    const shouldAdvance = useAtomValue(UserSettingsAtom.shouldAdvance);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleCheckedChange = (checked: boolean): void => {
        setUserSettings((u) =>
            u.setShouldAdvance(
                () => ShouldAdvance.createSafe(checked),
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <Switch
            label="左右タップで進む"
            checked={shouldAdvance.value}
            onCheckedChange={handleCheckedChange}
        />
    );
};
