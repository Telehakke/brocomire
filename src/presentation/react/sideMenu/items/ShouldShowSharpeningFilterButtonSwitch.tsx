import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react";
import { setShouldShowSharpeningFilterButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowSharpeningFilterButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowSharpeningFilterButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { shouldShowSharpeningFilterButtonAtom, userSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowSharpeningFilterButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(shouldShowSharpeningFilterButtonAtom);
  const setUserSettings = useSetAtom(userSettingsAtom);

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
      checked={shouldShowButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
