import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { IsSafeAreaEnabled } from "../../../../domain/models/userSettings/valueObjects/isSafeAreaEnabled";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const IsSafeAreaEnabledSwitch = (): JSX.Element => {
    const isSafeAreaEnabled = useAtomValue(UserSettingsAtom.isSafeAreaEnabled);
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleCheckedChange = (checked: boolean): void => {
        setUserSettings((u) =>
            u.setIsSafeAreaEnabled(
                () => IsSafeAreaEnabled.createSafe(checked),
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <Switch
            label="セーフエリアの有効化"
            checked={isSafeAreaEnabled.value}
            onCheckedChange={handleCheckedChange}
        />
    );
};
