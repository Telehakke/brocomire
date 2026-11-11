import { Sun } from "lucide-solid";
import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createOnInvertLightness } from "../../../application/appState/onInvertLightness";
import { updateScrollPercentage2D } from "../../../application/viewer/updateScrollPercentage2D";
import {
  isUserScrolledSignal,
  onInvertLightnessSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
} from "../../signals";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";
import { joinObjectValues } from "../utils/joinObjectValues";

export const InvertLightnessButton = (): JSX.Element => {
  const [userSettings] = userSettingsStore;
  const [onInvert] = onInvertLightnessSignal;

  return (
    <Show when={userSettings.shouldShowInvertLightnessButton}>
      <Show when={onInvert()} fallback={<InvertIconButton />}>
        <InvertIconBlueButton />
      </Show>
    </Show>
  );
};

/* -------------------------------------------------------------------------- */

const InvertIconBlueButton = (): JSX.Element => {
  const [, setOnInvert] = onInvertLightnessSignal;

  const handleClick = (): void => {
    setOnInvert(createOnInvertLightness(false));
    runUpdateScrollPercentage2D();
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Sun class={joinObjectValues(IconBlueButton.className)} />
    </IconBlueButton.Button>
  );
};

const InvertIconButton = (): JSX.Element => {
  const [, setOnInvert] = onInvertLightnessSignal;

  const handleClick = (): void => {
    setOnInvert(createOnInvertLightness(true));
    runUpdateScrollPercentage2D();
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Sun class={joinObjectValues(IconButton.className)} />
    </IconButton.Button>
  );
};

const runUpdateScrollPercentage2D = (): void => {
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [viewerManager] = viewerManagerSignal;

  updateScrollPercentage2D(
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    scrollPercentage2D(),
    viewerManager(),
  );
};
