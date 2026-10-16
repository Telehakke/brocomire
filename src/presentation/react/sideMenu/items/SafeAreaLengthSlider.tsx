import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import * as SafeAreaLength from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SafeAreaLengthSlider = (): JSX.Element => {
  const safeAreaLength = useAtomValue(UserSettingsAtom.safeAreaLength);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(safeAreaLength);

  const handleValueChangedEnd = (value: number): void => {
    setUserSettings((v) =>
      UserSettings.setSafeAreaLength(
        v,
        value as SafeAreaLength.SafeAreaLength,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={getLabel}
      min={SafeAreaLength.MIN}
      max={SafeAreaLength.MAX}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};

const getLabel = (value: number): string => {
  if (SafeAreaLength.isMin(value)) return "セーフエリアの長さ：自動";
  return `セーフエリアの長さ：${value}px`;
};
