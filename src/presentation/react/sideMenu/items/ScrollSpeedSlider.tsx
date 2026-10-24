import { useAtomValue, useSetAtom } from "jotai";
import { useState, type JSX } from "react";
import { setScrollSpeed } from "../../../../domain/models/userSettings/userSettings";
import {
  SCROLL_SPEED_MAX,
  SCROLL_SPEED_MIN,
  type ScrollSpeed,
} from "../../../../domain/models/userSettings/valueObjects/scrollSpeed";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const ScrollSpeedSlider = (): JSX.Element => {
  const scrollSpeed = useAtomValue(UserSettingsAtom.scrollSpeed);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(scrollSpeed);

  const handleValueChangeEnd = (value: number): void => {
    setUserSettings((v) =>
      setScrollSpeed(v, value as ScrollSpeed, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Slider
      label={(v) => `垂直・水平スクロール速度：${v}倍`}
      min={SCROLL_SPEED_MIN}
      max={SCROLL_SPEED_MAX}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
