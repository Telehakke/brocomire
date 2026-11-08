import { useAtomValue, useSetAtom } from "jotai";
import { Sun } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { createOnInvertLightness } from "../../../application/appState/onInvertLightness";
import { onInvertLightnessAtom, UserSettingsAtom } from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

export const InvertLightnessButton = (): JSX.Element | null => {
  const shouldShowButton = useAtomValue(UserSettingsAtom.shouldShowInvertLightnessButton);
  const onInvert = useAtomValue(onInvertLightnessAtom);

  if (!shouldShowButton) return null;
  if (onInvert) return <InvertIconBlueButton />;
  return <InvertIconButton />;
};

/* -------------------------------------------------------------------------- */

const InvertIconBlueButton = (): JSX.Element => {
  const setOnInvert = useSetAtom(onInvertLightnessAtom);

  const handleClick = (): void => {
    setOnInvert(createOnInvertLightness(false));
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Sun className={Object.values(IconBlueButton.className).join(" ")} />
    </IconBlueButton.Button>
  );
};

const InvertIconButton = (): JSX.Element => {
  const setOnInvert = useSetAtom(onInvertLightnessAtom);

  const handleClick = (): void => {
    setOnInvert(createOnInvertLightness(true));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Sun className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};
