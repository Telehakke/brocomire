import { createSignal } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { setLongPressRecognitionTime } from "../../../../domain/models/userSettings/userSettings";
import {
  LONG_PRESS_RECOGNITION_TIME_MAX,
  LONG_PRESS_RECOGNITION_TIME_MIN,
  type LongPressRecognitionTime,
} from "../../../../domain/models/userSettings/valueObjects/longPressRecognitionTime";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Slider } from "../../utils/Slider";

export const LongPressRecognitionTimeSlider = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;
  const [value, setValue] = createSignal<number>(userSettings.longPressRecognitionTime);

  const handleValueChangeEnd = (value: number): void => {
    setUserSettings((v) =>
      setLongPressRecognitionTime(
        v,
        value as LongPressRecognitionTime,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={(v) => `長押しの認識時間：${(v / 1000).toFixed(2)}秒`}
      min={LONG_PRESS_RECOGNITION_TIME_MIN}
      max={LONG_PRESS_RECOGNITION_TIME_MAX}
      step={50}
      value={value()}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
