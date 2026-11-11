import { createSignal } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { setMenuOpacity } from "../../../../domain/models/userSettings/userSettings";
import {
  MENU_OPACITY_MAX,
  MENU_OPACITY_MIN,
  type MenuOpacity,
} from "../../../../domain/models/userSettings/valueObjects/menuOpacity";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { userSettingsStore } from "../../../signals";
import { Slider } from "../../utils/Slider";

export const MenuOpacitySlider = (): JSX.Element => {
  const [userSettings, setUserSettings] = userSettingsStore;
  const [value, setValue] = createSignal<number>(userSettings.menuOpacity);

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
      value={value()}
      onValueChange={setValue}
      onValueChangeEnd={handleValueChangeEnd}
    />
  );
};
