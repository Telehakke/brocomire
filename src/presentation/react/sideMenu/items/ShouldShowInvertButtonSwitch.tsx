import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { ShouldShowInvertButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowInvertButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowInvertButtonSwitch = (): JSX.Element => {
    const shouldShowButton = useAtomValue(
        UserSettingsAtom.shouldShowInvertButton,
    );
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleCheckedChange = (checked: boolean): void => {
        setUserSettings((u) =>
            u.setShouldShowInvertButton(
                () => ShouldShowInvertButton.createSafe(checked),
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <Switch
            label="色反転ボタンをビューアに表示"
            checked={shouldShowButton.value}
            onCheckedChange={handleCheckedChange}
        />
    );
};
