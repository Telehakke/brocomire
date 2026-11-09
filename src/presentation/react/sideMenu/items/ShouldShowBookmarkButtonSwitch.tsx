import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { setShouldShowBookmarkButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowBookmarkButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowBookmarkButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { shouldShowBookmarkButtonAtom, userSettingsAtom } from "../../../atoms";
import { Switch } from "../../utils/Switch";

export const ShouldShowBookmarkButtonSwitch = (): JSX.Element => {
  const shouldShowButton = useAtomValue(shouldShowBookmarkButtonAtom);
  const setUserSettings = useSetAtom(userSettingsAtom);

  const handleCheckedChange = (checked: boolean): void => {
    setUserSettings((v) =>
      setShouldShowBookmarkButton(
        v,
        checked as ShouldShowBookmarkButton,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Switch
      label="ブックマークボタンを表示"
      checked={shouldShowButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
