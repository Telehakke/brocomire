import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { setShouldShowInvertLightnessButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowInvertLightnessButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowInvertLightnessButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowInvertLightnessButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowInvertLightnessButton);
  const setUserSettings = useSetAtom(Atom.userSettings);

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
