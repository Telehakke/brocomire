import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { setSafeAreaLength } from "../../../../domain/models/userSettings/userSettings";
import {
  SAFE_AREA_LENGTH_MAX,
  SAFE_AREA_LENGTH_MIN,
  type SafeAreaLength,
} from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SafeAreaLengthSlider = (): JSX.Element => {
  const safeAreaLength = useAtomValue(UserSettingsAtom.safeAreaLength);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(safeAreaLength);

  const handleValueChangedEnd = (value: number): void => {
    setUserSettings((v) =>
      setSafeAreaLength(v, value as SafeAreaLength, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Slider
      label={getLabel}
      min={SAFE_AREA_LENGTH_MIN}
      max={SAFE_AREA_LENGTH_MAX}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};

const getLabel = (value: number): string => {
  if (value === SAFE_AREA_LENGTH_MIN) return "セーフエリアの長さ：自動";
  return `セーフエリアの長さ：${value}px`;
};
