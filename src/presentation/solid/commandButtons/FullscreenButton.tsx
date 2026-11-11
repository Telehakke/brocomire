import { Fullscreen as FullscreenIcon } from "lucide-solid";
import { createSignal, Show, type Setter } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import {
  canUseFullscreen,
  exitFullscreen,
  requestFullscreen,
} from "../../../infrastructure/viewer/fullscreen";
import { userSettingsStore } from "../../signals";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";
import { joinObjectValues } from "../utils/joinObjectValues";

export const FullscreenButton = (): JSX.Element => {
  const [userSettings] = userSettingsStore;
  const [onFullscreen, setOnFullscreen] = createSignal(false);

  return (
    <Show when={userSettings.shouldShowFullscreenButton}>
      <Show
        when={onFullscreen()}
        fallback={<FullscreenIconButton setOnFullscreen={setOnFullscreen} />}
      >
        <FullscreenIconBlueButton setOnFullscreen={setOnFullscreen} />
      </Show>
    </Show>
  );
};

/* -------------------------------------------------------------------------- */

const FullscreenIconBlueButton = (props: { setOnFullscreen: Setter<boolean> }): JSX.Element => {
  const handleClick = (): void => {
    exitFullscreen();
    props.setOnFullscreen(false);
  };

  return (
    <IconBlueButton.Button onClick={handleClick}>
      <FullscreenIcon class={joinObjectValues(IconBlueButton.className)} />
    </IconBlueButton.Button>
  );
};

const FullscreenIconButton = (props: { setOnFullscreen: Setter<boolean> }): JSX.Element => {
  const handleClick = (): void => {
    if (!canUseFullscreen()) return;

    requestFullscreen();
    props.setOnFullscreen(true);
  };

  return (
    <IconButton.Button onClick={handleClick}>
      <FullscreenIcon class={joinObjectValues(IconButton.className)} />
    </IconButton.Button>
  );
};
