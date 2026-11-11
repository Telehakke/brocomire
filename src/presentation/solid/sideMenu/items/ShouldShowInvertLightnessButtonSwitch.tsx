import type { JSX } from "solid-js/jsx-runtime";
import { setShouldShowInvertLightnessButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowInvertLightnessButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowInvertLightnessButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldShowInvertLightnessButtonSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowInvertLightnessButton(
        v,
        checked as ShouldShowInvertLightnessButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="明度の反転ボタンを表示"
      checked={userSettings.shouldShowInvertLightnessButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
