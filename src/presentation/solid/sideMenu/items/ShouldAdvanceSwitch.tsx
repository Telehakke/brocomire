import type { JSX } from "solid-js/jsx-runtime";
import { setShouldAdvance } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldAdvance } from "../../../../domain/models/userSettings/valueObjects/shouldAdvance";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldAdvanceSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldAdvance(v, checked as ShouldAdvance, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Switch
      label="左右タップで進む"
      checked={userSettings.shouldAdvance}
      onCheckedChange={handleCheckedChange}
    />
  );
};
