import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { setLongPressRecognitionTime } from "../../../../domain/models/userSettings/userSettings";
import {
  LONG_PRESS_RECOGNITION_TIME_MAX,
  LONG_PRESS_RECOGNITION_TIME_MIN,
  type LongPressRecognitionTime,
} from "../../../../domain/models/userSettings/valueObjects/longPressRecognitionTime";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const LongPressRecognitionTimeSlider = (): JSX.Element => {
  const time = useAtomValue(UserSettingsAtom.longPressRecognitionTime);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(time);

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
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
