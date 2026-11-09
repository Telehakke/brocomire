import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { setShouldShowInvertLightnessButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowInvertLightnessButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowInvertLightnessButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { shouldShowInvertLightnessButtonAtom, userSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowInvertLightnessButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(shouldShowInvertLightnessButtonAtom);
  const setUserSettings = useSetAtom(userSettingsAtom);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowInvertLightnessButton(
        v,
        checked as ShouldShowInvertLightnessButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="明度の反転ボタンを表示"
      checked={shouldShowButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
