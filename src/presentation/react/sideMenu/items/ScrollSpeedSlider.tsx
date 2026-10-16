import { useAtomValue, useSetAtom } from "jotai";
import { useState, type JSX } from "react";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import * as ScrollSpeed from "../../../../domain/models/userSettings/valueObjects/scrollSpeed";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const ScrollSpeedSlider = (): JSX.Element => {
  const scrollSpeed = useAtomValue(UserSettingsAtom.scrollSpeed);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(scrollSpeed);

  const handleValueChangeEnd = (value: number): void => {
    setUserSettings((v) =>
      UserSettings.setScrollSpeed(
        v,
        value as ScrollSpeed.ScrollSpeed,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={(v) => `垂直・水平スクロール速度：${v}倍`}
      min={ScrollSpeed.MIN}
      max={ScrollSpeed.MAX}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
