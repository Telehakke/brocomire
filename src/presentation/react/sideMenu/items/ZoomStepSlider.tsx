import { useAtomValue, useSetAtom } from "jotai";
import { useState, type JSX } from "react";
import { setZoomStep } from "../../../../domain/models/userSettings/userSettings";
import {
  ZOOM_STEP_MAX,
  ZOOM_STEP_MIN,
  type ZoomStep,
} from "../../../../domain/models/userSettings/valueObjects/zoomStep";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const ZoomStepSlider = (): JSX.Element => {
  const zoomStep = useAtomValue(UserSettingsAtom.zoomStep);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(zoomStep);

  const handleValueChangedEnd = (value: number): void => {
    setUserSettings((v) =>
      setZoomStep(v, value as ZoomStep, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Slider
      label={(v) => `ズームの増減率：${v}%`}
      min={ZOOM_STEP_MIN}
      max={ZOOM_STEP_MAX}
      step={5}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangedEnd}
    />
  );
};
