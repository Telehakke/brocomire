import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { createIsOpenSideMenuStore } from "../../../../application/appState/isOpenSideMenu";
import { createIsUserScrolledStore } from "../../../../application/appState/isUserScrolled";
import { createFileNavigatorStore } from "../../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../../domain/models/notification/notification";
import { createZoomPercentageStore } from "../../../../domain/models/zoom/zoomPercentage";
import { KeydownMonitor } from "../../../../infrastructure/keyboard/keydownMonitor";
import {
  fileNavigatorAtom,
  isOpenSideMenuAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  userSettingsAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../../atoms";

const getKeydownMonitorAtom = atom(null, (get, set) => {
  return new KeydownMonitor(
    createFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    createIsOpenSideMenuStore(
      () => get(isOpenSideMenuAtom),
      (v) => set(isOpenSideMenuAtom, v),
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

export const KeydownListener = (): null => {
  const getKeydownMonitor = useSetAtom(getKeydownMonitorAtom);

  useEffect(() => {
    const keydownMonitor = getKeydownMonitor();
    keydownMonitor.start();
    return (): void => keydownMonitor.end();
  }, [getKeydownMonitor]);

  return null;
};
