import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { setMenuOpacity } from "../../../../domain/models/userSettings/userSettings";
import {
  MENU_OPACITY_MAX,
  MENU_OPACITY_MIN,
  type MenuOpacity,
} from "../../../../domain/models/userSettings/valueObjects/menuOpacity";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const MenuOpacitySlider = (): JSX.Element => {
  const menuOpacity = useAtomValue(UserSettingsAtom.menuOpacity);
  const setUserSettings = useSetAtom(Atom.userSettings);
  const [value, setValue] = useState<number>(menuOpacity);

  const handleValueChangeEnd = (value: number): void => {
    setUserSettings((v) =>
      setMenuOpacity(v, value as MenuOpacity, new LocalStorageUserSettingsRepository()),
    );
  };

  return (
    <Slider
      label={(v) => `メニューの不透明度：${v}%`}
      min={MENU_OPACITY_MIN}
      max={MENU_OPACITY_MAX}
      step={5}
      value={value}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
