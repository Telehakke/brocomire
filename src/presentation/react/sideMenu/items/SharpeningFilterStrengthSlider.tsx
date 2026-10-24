import { useAtomValue, useSetAtom } from "jotai";
import { useState, type JSX } from "react";
import { setSharpeningFilterStrength } from "../../../../domain/models/userSettings/userSettings";
import {
  SHARPENING_FILTER_STRENGTH_MAX,
  SHARPENING_FILTER_STRENGTH_MIN,
  type SharpeningFilterStrength,
} from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SharpeningFilterStrengthSlider = (): JSX.Element => {
  const strength = useAtomValue(UserSettingsAtom.sharpeningFilterStrength);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(strength);

  const handleValueChangedEnd = (value: number): void => {
    setUserSettings((v) =>
      setSharpeningFilterStrength(
        v,
        value as SharpeningFilterStrength,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={(v) => `フィルター強度：${v}`}
      min={SHARPENING_FILTER_STRENGTH_MIN}
      max={SHARPENING_FILTER_STRENGTH_MAX}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};
