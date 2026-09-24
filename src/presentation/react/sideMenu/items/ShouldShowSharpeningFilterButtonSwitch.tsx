import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { ShouldShowSharpeningFilterButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowSharpeningFilterButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowSharpeningFilterButtonSwitch = (): JSX.Element => {
    const shouldShowButton = useAtomValue(
        UserSettingsAtom.shouldShowSharpeningFilterButton,
    );
    const setUserSettings = useSetAtom(Atom.userSettings);

    const handleCheckedChange = (checked: boolean): void => {
        setUserSettings((u) =>
            u.copyWith(
                {
                    shouldShowSharpeningFilterButton:
                        ShouldShowSharpeningFilterButton.createSafe(checked),
                },
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <Switch
            label="先鋭化ボタンをビューアに表示"
            checked={shouldShowButton.value}
            onCheckedChange={handleCheckedChange}
        />
    );
};
