import { onCleanup, onMount } from "solid-js";
import { createIsLandscapeStore } from "../../../../application/appState/isLandscape";
import { LandscapeMonitor } from "../../../../infrastructure/device/landscapeMonitor";
import { isLandscapeSignal } from "../../../signals";

export const LandscapeListener = (): null => {
  const landscapeMonitor = createLandscapeMonitor();

  onMount(() => {
    landscapeMonitor.start();
    landscapeMonitor.setStore();
  });

  onCleanup(() => landscapeMonitor.end());

  return null;
};

const createLandscapeMonitor = (): LandscapeMonitor => {
  const [isLandscape, setIsLandscape] = isLandscapeSignal;

  return new LandscapeMonitor(
    createIsLandscapeStore(
      () => isLandscape(),
      (v) => setIsLandscape(v),
    ),
  );
};
