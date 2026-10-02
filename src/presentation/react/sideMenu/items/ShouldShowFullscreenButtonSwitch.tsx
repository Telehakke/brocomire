import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { ShouldShowFullscreenButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowFullscreenButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowFullscreenButtonSwitch = (): JSX.Element => {
    const shouldShowButton = useAtomValue(
        UserSettingsAtom.shouldShowFullscreenButton,
    );
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleCheckedChange = (checked: boolean): void => {
        setUserSettings((u) =>
            u.setShouldShowFullscreenButton(
                () => ShouldShowFullscreenButton.createSafe(checked),
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <Switch
            label="全画面ボタンをビューアに表示"
            checked={shouldShowButton.value}
            onCheckedChange={handleCheckedChange}
        />
    );
};
