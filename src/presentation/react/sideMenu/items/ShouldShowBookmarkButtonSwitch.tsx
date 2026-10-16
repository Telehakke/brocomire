import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowBookmarkButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowBookmarkButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowBookmarkButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowBookmarkButton);
  const setUserSettings = useSetAtom(Atom.userSettings);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      UserSettings.setShouldShowBookmarkButton(
        v,
        checked as ShouldShowBookmarkButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="ブックマークボタンをビューアに表示"
      checked={shouldShowButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
