import type { JSX } from "solid-js/jsx-runtime";
import { setShouldShowBookmarkButton } from "../../../../domain/models/userSettings/userSettings";
import type { ShouldShowBookmarkButton } from "../../../../domain/models/userSettings/valueObjects/shouldShowBookmarkButton";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Switch } from "../../utils/Switch";

export const ShouldShowBookmarkButtonSwitch = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;

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
      checked={userSettings.shouldShowBookmarkButton}
      onCheckedChange={handleCheckedChange}
    />
  );
};
