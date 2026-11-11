import type { JSX } from "solid-js/jsx-runtime";
import { setShouldShowSharpeningFilterButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowSharpeningFilterButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowSharpeningFilterButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldShowSharpeningFilterButtonSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowSharpeningFilterButton(
        v,
        checked as ShouldShowSharpeningFilterButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="先鋭化フィルターボタンを表示"
      checked={userSettings.shouldShowSharpeningFilterButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
