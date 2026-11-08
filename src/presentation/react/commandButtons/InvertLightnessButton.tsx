import { atom, useAtomValue, useSetAtom } from "jotai";
import { Sun } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { getIsUserScrolledStore } from "../../../application/appState/isUserScrolled";
import { createOnInvertLightness } from "../../../application/appState/onInvertLightness";
import { updateScrollPercentage2D } from "../../../application/viewer/updateScrollPercentage2D";
import {
  isUserScrolledAtom,
  onInvertLightnessAtom,
  scrollPercentage2DAtom,
  UserSettingsAtom,
  viewerManagerAtom,
} from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

const updateScrollPercentage2DAtom = atom(null, (get, set) => {
  updateScrollPercentage2D({
    isUserScrolledStore: getIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    viewerManager: get(viewerManagerAtom),
  });
});

/* -------------------------------------------------------------------------- */

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
  const updateScrollPercentage2D = useSetAtom(updateScrollPercentage2DAtom);

  const handleClick = (): void => {
    setOnInvert(createOnInvertLightness(false));
    updateScrollPercentage2D();
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Sun className={Object.values(IconBlueButton.className).join(" ")} />
    </IconBlueButton.Button>
  );
};

const InvertIconButton = (): JSX.Element => {
  const setOnInvert = useSetAtom(onInvertLightnessAtom);
  const updateScrollPercentage2D = useSetAtom(updateScrollPercentage2DAtom);

  const handleClick = (): void => {
    setOnInvert(createOnInvertLightness(true));
    updateScrollPercentage2D();
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Sun className={Object.values(IconButton.className).join(" ")} />
    </IconButton.Button>
  );
};
