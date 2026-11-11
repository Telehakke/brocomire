import { Sparkle } from "lucide-solid";
import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createOnSharpeningFilter } from "../../../application/appState/onSharpeningFilter";
import { updateScrollPercentage2D } from "../../../application/viewer/updateScrollPercentage2D";
import {
  isUserScrolledSignal,
  onSharpeningFilterSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
} from "../../signals";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";
import { joinObjectValues } from "../utils/joinObjectValues";

export const SharpeningFilterButton = (): JSX.Element => {
  const [userSettings] = userSettingsStore;
  const [onFilter] = onSharpeningFilterSignal;

  return (
    <Show when={userSettings.shouldShowSharpeningFilterButton}>
      <Show when={onFilter()} fallback={<SharpeningFilterIconButton />}>
        <SharpeningFilterIconBlueButton />
      </Show>
    </Show>
  );
};

/* -------------------------------------------------------------------------- */

const SharpeningFilterIconBlueButton = (): JSX.Element => {
  const [, setOnFilter] = onSharpeningFilterSignal;

  const handleClick = (): void => {
    setOnFilter(createOnSharpeningFilter(false));
    runUpdateScrollPercentage2D();
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Sparkle class={joinObjectValues(IconBlueButton.className)} />
    </IconBlueButton.Button>
  );
};

const SharpeningFilterIconButton = (): JSX.Element => {
  const [, setOnFilter] = onSharpeningFilterSignal;

  const handleClick = (): void => {
    setOnFilter(createOnSharpeningFilter(true));
    runUpdateScrollPercentage2D();
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Sparkle class={joinObjectValues(IconButton.className)} />
    </IconButton.Button>
  );
};

/* -------------------------------------------------------------------------- */

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
