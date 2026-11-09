import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { createIsUserScrolledStore } from "../../../../application/appState/isUserScrolled";
import { createFileNavigatorStore } from "../../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../../domain/models/notification/notification";
import { createZoomPercentageStore } from "../../../../domain/models/zoom/zoomPercentage";
import { GamepadMonitor } from "../../../../infrastructure/gamepad/gamepadMonitor";
import {
  fileNavigatorAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  userSettingsAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../../atoms";

const getGamepadMonitorAtom = atom(null, (get, set) => {
  return new GamepadMonitor(
    createFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    createIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    createNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    get(scrollPercentage2DAtom),
    () => get(userSettingsAtom),
    get(viewerManagerAtom),
    createZoomPercentageStore(
      () => get(zoomPercentageAtom),
      (v) => set(zoomPercentageAtom, v),
    ),
  );
});

/* -------------------------------------------------------------------------- */

export const GamepadListener = (): null => {
  const getGamepadMonitor = useSetAtom(getGamepadMonitorAtom);

  useEffect(() => {
    const gamepadMonitor = getGamepadMonitor();
    gamepadMonitor.start();
    return (): void => gamepadMonitor.end();
  }, [getGamepadMonitor]);

  return null;
};
