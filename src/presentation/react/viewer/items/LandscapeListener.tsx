import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import * as IsLandscape from "../../../../application/appState/isLandscape";
import { LandscapeMonitor } from "../../../../infrastructure/device/landscapeMonitor";
import { isLandscapeAtom } from "../../../atoms";

const getLandscapeMonitorAtom = atom(null, (get, set) => {
  const isLandscapeStore = IsLandscape.getStore(
    () => get(isLandscapeAtom),
    (v) => set(isLandscapeAtom, v),
  );
  return new LandscapeMonitor(isLandscapeStore);
});

/* -------------------------------------------------------------------------- */

export const LandscapeListener = (): null => {
  const getLandscapeMonitor = useSetAtom(getLandscapeMonitorAtom);

  useEffect(() => {
    const landscapeMonitor = getLandscapeMonitor();
    landscapeMonitor.runOnce();
    landscapeMonitor.start();
    return (): void => landscapeMonitor.end();
  }, [getLandscapeMonitor]);

  return null;
};
