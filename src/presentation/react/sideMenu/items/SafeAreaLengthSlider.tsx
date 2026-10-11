import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { SafeAreaLength } from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SafeAreaLengthSlider = (): JSX.Element => {
  const safeAreaLength = useAtomValue(UserSettingsAtom.safeAreaLength);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState(safeAreaLength);

  const handleValueChangedEnd = (value: number): void => {
    setUserSettings((u) =>
      UserSettings.setSafeAreaLength(
        u,
        value as SafeAreaLength,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={getLabel}
      min={SafeAreaLength.MIN}
      max={SafeAreaLength.MAZ}
      value={value}
      onValueChange={(v) => setValue(v as SafeAreaLength)}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};

const getLabel = (value: number): string => {
  if (value === SafeAreaLength.MIN) return "セーフエリアの長さ：自動";
  return `セーフエリアの長さ：${value}px`;
};
