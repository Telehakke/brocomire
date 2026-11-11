import type { JSX } from "solid-js/jsx-runtime";
import { setShouldShowInvertButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowInvertButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowInvertButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldShowInvertButtonSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowInvertButton(
        v,
        checked as ShouldShowInvertButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="色の反転ボタンを表示"
      checked={userSettings.shouldShowInvertButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
