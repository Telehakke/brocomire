import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { getIsOpenSideMenuStore } from "../../../../application/appState/isOpenSideMenu";
import { getIsUserScrolledStore } from "../../../../application/appState/isUserScrolled";
import { getFileNavigatorStore } from "../../../../domain/models/file/fileNavigator";
import { getNotificationStore } from "../../../../domain/models/notification/notification";
import { getZoomPercentageStore } from "../../../../domain/models/zoom/zoomPercentage";
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
    getFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    getIsOpenSideMenuStore(
      () => get(isOpenSideMenuAtom),
      (v) => set(isOpenSideMenuAtom, v),
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

export const KeydownListener = (): null => {
  const getKeydownMonitor = useSetAtom(getKeydownMonitorAtom);

  useEffect(() => {
    const keydownMonitor = getKeydownMonitor();
    keydownMonitor.start();
    return (): void => keydownMonitor.end();
  }, [getKeydownMonitor]);

  return null;
};
