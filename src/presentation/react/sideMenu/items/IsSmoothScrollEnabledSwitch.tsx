import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { setIsSmoothScrollEnabled } from "../../../../domain/models/userSettings/userSettings";
import type { IsSmoothScrollEnabled } from "../../../../domain/models/userSettings/valueObjects/isSmoothScrollEnabled";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const IsSmoothScrollEnabledSwitch = (): JSX.Element => {
  const isSmoothScrollEnabled = useAtomValue(UserSettingsAtom.isSmoothScrollEnabled);
  const setUserSettings = useSetAtom(Atom.userSettings);

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
      checked={isSmoothScrollEnabled}
      onCheckedChange={handleCheckedChange}
    />
  );
};
