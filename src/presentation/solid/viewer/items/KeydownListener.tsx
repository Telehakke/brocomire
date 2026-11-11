import { onCleanup, onMount } from "solid-js";
import { KeydownMonitor } from "../../../../infrastructure/keyboard/keydownMonitor";
import {
  fileNavigatorSignal,
  isOpenSideMenuSignal,
  isUserScrolledSignal,
  notificationSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
  zoomPercentageSignal,
} from "../../../signals";

export const KeydownListener = (): null => {
  const keydownMonitor = createKeydownMonitor();

  onMount(() => keydownMonitor.start());

  onCleanup(() => keydownMonitor.end());

  return null;
};

/* -------------------------------------------------------------------------- */

const createKeydownMonitor = (): KeydownMonitor => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isOpenSideMenu] = isOpenSideMenuSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;
  const [zoomPercentage, setZoomPercentage] = zoomPercentageSignal;

  return new KeydownMonitor(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    () => isOpenSideMenu(),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
    () => zoomPercentage(),
    (v) => setZoomPercentage(v),
  );
};
