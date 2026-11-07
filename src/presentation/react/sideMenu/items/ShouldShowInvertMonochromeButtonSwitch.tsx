import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { setShouldShowInvertMonochromeButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowInvertMonochromeButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowInvertMonochromeButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowInvertMonochromeButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowInvertMonochromeButton);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowInvertMonochromeButton(
        v,
        checked as ShouldShowInvertMonochromeButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="モノクロ反転ボタンを表示"
      checked={shouldShowButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
