import type { JSX } from "solid-js/jsx-runtime";
import { setShouldPreload } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldPreload } from "../../../../domain/models/userSettings/valueObjects/shouldPreload";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldPreloadSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldPreload(v, checked as ShouldPreload, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Switch
      label="先読みの有効化"
      checked={userSettings.shouldPreload}
      onCheckedChange={handleCheckedChange}
    />
  );
};
