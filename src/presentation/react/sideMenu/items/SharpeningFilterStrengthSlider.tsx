import { useAtomValue, useSetAtom } from "jotai";
import { useState, type JSX } from "react";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { SharpeningFilterStrength } from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SharpeningFilterStrengthSlider = (): JSX.Element => {
  const strength = useAtomValue(UserSettingsAtom.sharpeningFilterStrength);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState(strength);

  const handleValueChangedEnd = (value: number): void => {
    setUserSettings((u) =>
      UserSettings.setSharpeningFilterStrength(
        u,
        value as SharpeningFilterStrength,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={(v) => `フィルター強度：${v}`}
      min={SharpeningFilterStrength.MIN}
      max={SharpeningFilterStrength.MAX}
      value={value}
      onValueChange={(v) => setValue(v as SharpeningFilterStrength)}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};
