import type { JSX } from "solid-js/jsx-runtime";
import { setIsSmoothScrollEnabled } from "../../../../domain/models/userSettings/userSettings";
import type { IsSmoothScrollEnabled } from "../../../../domain/models/userSettings/valueObjects/isSmoothScrollEnabled";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const IsSmoothScrollEnabledSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setIsSmoothScrollEnabled(
        v,
        checked as IsSmoothScrollEnabled,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="滑らかスクロールの有効化"
      checked={userSettings.isSmoothScrollEnabled}
      onCheckedChange={handleCheckedChange}
    />
  );
};
