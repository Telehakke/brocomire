import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { setShouldPreload } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldPreload } from "../../../../domain/models/userSettings/valueObjects/shouldPreload";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { shouldPreloadAtom, userSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldPreloadSwitch = (): JSX.Element => {
  const shouldPreload = useAtomValue(shouldPreloadAtom);
  const setUserSettings = useSetAtom(userSettingsAtom);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldPreload(v, checked as ShouldPreload, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Switch label="先読みの有効化" checked={shouldPreload} onCheckedChange={handleCheckedChange} />
  );
};
