import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowSharpeningFilterButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowSharpeningFilterButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowSharpeningFilterButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowSharpeningFilterButton);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      UserSettings.setShouldShowSharpeningFilterButton(
        v,
        checked as ShouldShowSharpeningFilterButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="先鋭化ボタンをビューアに表示"
      checked={shouldShowButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
