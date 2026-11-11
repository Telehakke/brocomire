import { onCleanup, onMount } from "solid-js";
import { LandscapeMonitor } from "../../../../infrastructure/device/landscapeMonitor";
import { isLandscapeSignal } from "../../../signals";

export const LandscapeListener = (): null => {
  const landscapeMonitor = createLandscapeMonitor();

  onMount(() => {
    landscapeMonitor.start();
    landscapeMonitor.update();
  });

  onCleanup(() => landscapeMonitor.end());

  return null;
};

/* -------------------------------------------------------------------------- */

const createLandscapeMonitor = (): LandscapeMonitor => {
  const [, setIsLandscape] = isLandscapeSignal;

  return new LandscapeMonitor((v) => setIsLandscape(v));
};
