import { createSignal } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { setSafeAreaLength } from "../../../../domain/models/userSettings/userSettings";
import {
  SAFE_AREA_LENGTH_MAX,
  SAFE_AREA_LENGTH_MIN,
  type SafeAreaLength,
} from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Slider } from "../../utils/Slider";

export const SafeAreaLengthSlider = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;
  const [value, setValue] = createSignal<number>(userSettings.safeAreaLength);

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
      value={value()}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};

const getLabel = (value: number): string => {
  if (value === SAFE_AREA_LENGTH_MIN) return "セーフエリアの長さ：自動";
  return `セーフエリアの長さ：${value}px`;
};
