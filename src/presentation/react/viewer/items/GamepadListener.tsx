import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { getIsUserScrolledStore } from "../../../../application/appState/isUserScrolled";
import { getFileNavigatorStore } from "../../../../domain/models/file/fileNavigator";
import { getNotificationStore } from "../../../../domain/models/notification/notification";
import { getZoomPercentageStore } from "../../../../domain/models/zoom/zoomPercentage";
import { GamepadMonitor } from "../../../../infrastructure/gamepad/gamepadMonitor";
import {
  Atom,
  fileNavigatorAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../../atoms";

const getGamepadMonitorAtom = atom(null, (get, set) => {
  return new GamepadMonitor(
    getFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    getIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    getNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    get(scrollPercentage2DAtom),
    () => get(Atom.userSettings),
    get(viewerManagerAtom),
    getZoomPercentageStore(
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
