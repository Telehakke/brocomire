import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowProgressBar } from "../../../../domain/models/userSettings/valueObjects/shouldShowProgressBar";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowProgressBarSwitch = (): JSX.Element => {
  const shouldShowProgressBar = useAtomValue(UserSettingsAtom.shouldShowProgressBar);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      UserSettings.setShouldShowProgressBar(
        v,
        checked as ShouldShowProgressBar,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="プログレスバーを常に表示"
      checked={shouldShowProgressBar}
      onCheckedChange={handleCheckedChange}
    />
  );
};
