import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { IsUserScrolled } from "../../../../application/appState/valueObjects/isUserScrolled";
import { FileNavigator } from "../../../../domain/models/file/fileNavigator";
import { Notification } from "../../../../domain/models/notification/notification";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { ZoomPercentage } from "../../../../domain/models/zoom/zoomPercentage";
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
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const isUserScrolledStore = IsUserScrolled.getStore(
    () => get(isUserScrolledAtom),
    (v) => set(isUserScrolledAtom, v),
  );
  const notificationStore = Notification.getStore(
    () => get(notificationAtom),
    (v) => set(notificationAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  const zoomPercentageStore = ZoomPercentage.getStore(
    () => get(zoomPercentageAtom),
    (v) => set(zoomPercentageAtom, v),
  );
  return new GamepadMonitor(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
    zoomPercentageStore,
  );
});

export const GamepadListener = (): null => {
  const getGamepadMonitor = useSetAtom(getGamepadMonitorAtom);

  useEffect(() => {
    const gamepadMonitor = getGamepadMonitor();
    gamepadMonitor.start();
    return (): void => gamepadMonitor.end();
  }, [getGamepadMonitor]);

  return null;
};
