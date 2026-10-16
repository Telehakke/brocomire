import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import * as IsOpenSideMenu from "../../../../application/appState/isOpenSideMenu";
import * as IsUserScrolled from "../../../../application/appState/isUserScrolled";
import * as FileNavigator from "../../../../domain/models/file/fileNavigator";
import * as Notification from "../../../../domain/models/notification/notification";
import * as ZoomPercentage from "../../../../domain/models/zoom/zoomPercentage";
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
  return new KeydownMonitor(
    FileNavigator.getStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    IsOpenSideMenu.getStore(
      () => get(isOpenSideMenuAtom),
      (v) => set(isOpenSideMenuAtom, v),
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

export const KeydownListener = (): null => {
  const getKeydownMonitor = useSetAtom(getKeydownMonitorAtom);

  useEffect(() => {
    const keydownMonitor = getKeydownMonitor();
    keydownMonitor.start();
    return (): void => keydownMonitor.end();
  }, [getKeydownMonitor]);

  return null;
};
