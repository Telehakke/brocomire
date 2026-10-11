import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { ShouldPreload } from "../../../../domain/models/userSettings/valueObjects/shouldPreload";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldPreloadSwitch = (): JSX.Element => {
  const shouldPreload = useAtomValue(UserSettingsAtom.shouldPreload);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((u) =>
      UserSettings.setShouldPreload(
        u,
        checked as ShouldPreload,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch label="先読みの有効化" checked={shouldPreload} onCheckedChange={handleCheckedChange} />
  );
};
