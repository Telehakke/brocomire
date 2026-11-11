import { createSignal } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { setSharpeningFilterStrength } from "../../../../domain/models/userSettings/userSettings";
import {
  SHARPENING_FILTER_STRENGTH_MAX,
  SHARPENING_FILTER_STRENGTH_MIN,
  type SharpeningFilterStrength,
} from "../../../../domain/models/userSettings/valueObjects/sharpeningFilterStrength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Slider } from "../../utils/Slider";

export const SharpeningFilterStrengthSlider = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;
  const [value, setValue] = createSignal<number>(userSettings.sharpeningFilterStrength);

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
      value={value()}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};
