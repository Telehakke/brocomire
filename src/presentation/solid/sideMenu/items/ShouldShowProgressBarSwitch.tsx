import type { JSX } from "solid-js/jsx-runtime";
import { setShouldShowProgressBar } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowProgressBar } from "../../../../domain/models/userSettings/valueObjects/shouldShowProgressBar";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldShowProgressBarSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowProgressBar(
        v,
        checked as ShouldShowProgressBar,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="プログレスバーを常に表示"
      checked={userSettings.shouldShowProgressBar}
      onCheckedChange={handleCheckedChange}
    />
  );
};
