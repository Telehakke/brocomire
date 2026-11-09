import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { setShouldShowInvertButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowInvertButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowInvertButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { shouldShowInvertButtonAtom, userSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowInvertButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(shouldShowInvertButtonAtom);
  const setUserSettings = useSetAtom(userSettingsAtom);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowInvertButton(
        v,
        checked as ShouldShowInvertButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="色の反転ボタンを表示"
      checked={shouldShowButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
