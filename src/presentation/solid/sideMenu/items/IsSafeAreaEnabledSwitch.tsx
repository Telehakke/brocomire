import type { JSX } from "solid-js/jsx-runtime";
import { setIsSafeAreaEnabled } from "../../../../domain/models/userSettings/userSettings";
import type { IsSafeAreaEnabled } from "../../../../domain/models/userSettings/valueObjects/isSafeAreaEnabled";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const IsSafeAreaEnabledSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setIsSafeAreaEnabled(
        v,
        checked as IsSafeAreaEnabled,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="セーフエリアの有効化"
      checked={userSettings.isSafeAreaEnabled}
      onCheckedChange={handleCheckedChange}
    />
  );
};
