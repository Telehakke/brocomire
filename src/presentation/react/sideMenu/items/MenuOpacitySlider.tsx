import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import * as UserSettings from "../../../../domain/models/userSettings/userSettings";
import * as MenuOpacity from "../../../../domain/models/userSettings/valueObjects/menuOpacity";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const MenuOpacitySlider = (): JSX.Element => {
  const menuOpacity = useAtomValue(UserSettingsAtom.menuOpacity);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(menuOpacity);

  const handleValueChangeEnd = (value: number): void => {
    setUserSettings((v) =>
      UserSettings.setMenuOpacity(
        v,
        value as MenuOpacity.MenuOpacity,
        new LocalStorageUserSettingsRepository(),
      ),
    );
  };

  return (
    <Slider
      label={(v) => `メニューの不透明度：${v}%`}
      min={MenuOpacity.MIN}
      max={MenuOpacity.MAX}
      step={5}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
