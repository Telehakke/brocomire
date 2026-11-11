import { onCleanup, onMount } from "solid-js";
import { GamepadMonitor } from "../../../../infrastructure/gamepad/gamepadMonitor";
import {
  fileNavigatorSignal,
  isUserScrolledSignal,
  notificationSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
  zoomPercentageSignal,
} from "../../../signals";

export const GamepadListener = (): null => {
  const gamepadMonitor = createGamepadMonitor();

  onMount(() => gamepadMonitor.start());

  onCleanup(() => gamepadMonitor.end());

  return null;
};

const createGamepadMonitor = (): GamepadMonitor => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;
  const [zoomPercentage, setZoomPercentage] = zoomPercentageSignal;

  return new GamepadMonitor(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
    () => zoomPercentage(),
    (v) => setZoomPercentage(v),
  );
};
