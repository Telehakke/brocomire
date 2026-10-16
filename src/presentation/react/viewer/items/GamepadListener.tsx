import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import * as IsUserScrolled from "../../../../application/appState/isUserScrolled";
import * as FileNavigator from "../../../../domain/models/file/fileNavigator";
import * as Notification from "../../../../domain/models/notification/notification";
import * as ZoomPercentage from "../../../../domain/models/zoom/zoomPercentage";
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
    FileNavigator.getStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    IsUserScrolled.getStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    Notification.getStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    get(scrollPercentage2DAtom),
    () => get(Atom.userSettings),
    get(viewerManagerAtom),
    ZoomPercentage.getStore(
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
