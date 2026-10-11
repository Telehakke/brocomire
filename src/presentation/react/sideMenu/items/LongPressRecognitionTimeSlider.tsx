import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { LongPressRecognitionTime } from "../../../../domain/models/userSettings/valueObjects/longPressRecognitionTime";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const LongPressRecognitionTimeSlider = (): JSX.Element => {
  const time = useAtomValue(UserSettingsAtom.longPressRecognitionTime);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState(time);

  const handleValueChangeEnd = (value: number): void => {
    setUserSettings((u) =>
      UserSettings.setLongPressRecognitionTime(
        u,
        value as LongPressRecognitionTime,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={(v) => `長押しの認識時間：${(v / 1000).toFixed(2)}秒`}
      min={LongPressRecognitionTime.MIN}
      max={LongPressRecognitionTime.MAZ}
      step={50}
      value={value}
      onValueChange={(v) => setValue(v as LongPressRecognitionTime)}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
