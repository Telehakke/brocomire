import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { setMonochromeTolerance } from "../../../../domain/models/userSettings/userSettings";
import {
  MONOCHROME_TOLERANCE_MAX,
  MONOCHROME_TOLERANCE_MIN,
  type MonochromeTolerance,
} from "../../../../domain/models/userSettings/valueObjects/monochromeTolerance";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const MonochromeToleranceSlider = (): JSX.Element => {
  const monochromeTolerance = useAtomValue(UserSettingsAtom.monochromeTolerance);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(monochromeTolerance);

  const handleValueChangeEnd = (value: number): void => {
    setUserSettings((v) =>
      setMonochromeTolerance(
        v,
        value as MonochromeTolerance,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={(v) => `モノクロ判定の寛大さ：${v}`}
      min={MONOCHROME_TOLERANCE_MIN}
      max={MONOCHROME_TOLERANCE_MAX}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
