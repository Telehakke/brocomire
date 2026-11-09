import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { createIsLandscapeStore } from "../../../../application/appState/isLandscape";
import { LandscapeMonitor } from "../../../../infrastructure/device/landscapeMonitor";
import { isLandscapeAtom } from "../../../atoms";

const getLandscapeMonitorAtom = atom(null, (get, set) => {
  return new LandscapeMonitor(
    createIsLandscapeStore(
      () => get(isLandscapeAtom),
      (v) => set(isLandscapeAtom, v),
    ),
  );
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
