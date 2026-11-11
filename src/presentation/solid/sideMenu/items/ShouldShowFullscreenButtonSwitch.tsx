import type { JSX } from "solid-js/jsx-runtime";
import { setShouldShowFullscreenButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowFullscreenButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowFullscreenButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldShowFullscreenButtonSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowFullscreenButton(
        v,
        checked as ShouldShowFullscreenButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="全画面ボタンを表示"
      checked={userSettings.shouldShowFullscreenButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
