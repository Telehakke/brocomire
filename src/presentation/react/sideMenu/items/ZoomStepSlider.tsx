import { useAtomValue, useSetAtom } from "jotai";
import { useState, type JSX } from "react";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { ZoomStep } from "../../../../domain/models/userSettings/valueObjects/zoomStep";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const ZoomStepSlider = (): JSX.Element => {
  const zoomStep = useAtomValue(UserSettingsAtom.zoomStep);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState(zoomStep);

  const handleValueChangedEnd = (value: number): void => {
    setUserSettings((u) =>
      UserSettings.setZoomStep(u, value as ZoomStep, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Slider
      label={(v) => `ズームの増減率：${v}%`}
      min={ZoomStep.MIN}
      max={ZoomStep.MAX}
      step={5}
      value={value}
      onValueChange={(v) => setValue(v as ZoomStep)}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};
