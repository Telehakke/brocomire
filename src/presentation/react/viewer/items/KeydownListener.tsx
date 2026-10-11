import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { IsOpenSideMenu } from "../../../../application/appState/valueObjects/isOpenSideMenu";
import { IsUserScrolled } from "../../../../application/appState/valueObjects/isUserScrolled";
import { FileNavigator } from "../../../../domain/models/file/fileNavigator";
import { Notification } from "../../../../domain/models/notification/notification";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { ZoomPercentage } from "../../../../domain/models/zoom/zoomPercentage";
import { KeydownMonitor } from "../../../../infrastructure/keyboard/keydownMonitor";
import {
  Atom,
  fileNavigatorAtom,
  isOpenSideMenuAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../../atoms";

const getKeydownMonitorAtom = atom(null, (get, set) => {
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const isOpenSideMenuStore = IsOpenSideMenu.getStore(
    () => get(isOpenSideMenuAtom),
    (v) => set(isOpenSideMenuAtom, v),
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
  return new KeydownMonitor(
    fileNavigatorStore,
    isOpenSideMenuStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
    zoomPercentageStore,
  );
});

export const KeydownListener = (): null => {
  const getKeydownMonitor = useSetAtom(getKeydownMonitorAtom);

  useEffect(() => {
    const keydownMonitor = getKeydownMonitor();
    keydownMonitor.start();
    return (): void => keydownMonitor.end();
  }, [getKeydownMonitor]);

  return null;
};
