import { Droplet } from "lucide-solid";
import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createOnInvertFilter } from "../../../application/appState/onInvertFilter";
import { onInvertFilterSignal, userSettingsStore } from "../../signals";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";
import { joinObjectValues } from "../utils/joinObjectValues";

export const InvertFilterButton = (): JSX.Element => {
  const [userSettings] = userSettingsStore;
  const [onFilter] = onInvertFilterSignal;

  return (
    <Show when={userSettings.shouldShowInvertButton}>
      <Show when={onFilter()} fallback={<InvertIconButton />}>
        <InvertIconBlueButton />
      </Show>
    </Show>
  );
};

/* -------------------------------------------------------------------------- */

const InvertIconBlueButton = (): JSX.Element => {
  const [, setOnFilter] = onInvertFilterSignal;

  const handleClick = (): void => {
    setOnFilter(createOnInvertFilter(false));
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <Droplet class={joinObjectValues(IconBlueButton.className)} />
    </IconBlueButton.Button>
  );
};

const InvertIconButton = (): JSX.Element => {
  const [, setOnFilter] = onInvertFilterSignal;

  const handleClick = (): void => {
    setOnFilter(createOnInvertFilter(true));
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <Droplet class={joinObjectValues(IconButton.className)} />
    </IconButton.Button>
  );
};
