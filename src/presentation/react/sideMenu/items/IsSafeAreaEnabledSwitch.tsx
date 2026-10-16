import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import type { IsSafeAreaEnabled } from "../../../../domain/models/userSettings/valueObjects/isSafeAreaEnabled";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const IsSafeAreaEnabledSwitch = (): JSX.Element => {
  const isSafeAreaEnabled = useAtomValue(UserSettingsAtom.isSafeAreaEnabled);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      UserSettings.setIsSafeAreaEnabled(
        v,
        checked as IsSafeAreaEnabled,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="セーフエリアの有効化"
      checked={isSafeAreaEnabled}
      onCheckedChange={handleCheckedChange}
    />
  );
};
