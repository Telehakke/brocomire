import { atom, useAtomValue, useSetAtom } from "jotai";
import { type JSX } from "react";
import { createIsUserScrolledStore } from "../../../../application/appState/isUserScrolled";
import { handleBottomEdgeClick } from "../../../../application/viewer/handleBottomEdgeClick";
import { handleBottomEdgeSubClick } from "../../../../application/viewer/handleBottomEdgeSubClick";
import { handleLeftEdgeClick } from "../../../../application/viewer/handleLeftEdgeClick";
import { handleLeftEdgeSubClick } from "../../../../application/viewer/handleLeftEdgeSubClick";
import { handleRightEdgeClick } from "../../../../application/viewer/handleRightEdgeClick";
import { handleRightEdgeSubClick } from "../../../../application/viewer/handleRightEdgeSubClick";
import { scrollByXPx } from "../../../../application/viewer/scrollByXPx";
import { scrollByYPx } from "../../../../application/viewer/scrollByYPx";
import { createFileNavigatorStore } from "../../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../../domain/models/notification/notification";
import {
  SizeEnum,
  type SizeValue,
} from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import {
  fileNavigatorAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  tapAreaSizeAtom,
  userSettingsAtom,
  viewerManagerAtom,
} from "../../../atoms";
import { TapArea } from "./TapArea";

const handleLeftEdgeClickAtom = atom(null, (get, set) => {
  handleLeftEdgeClick(
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
  );
});

const handleLeftEdgeSubClickAtom = atom(null, (get, set) => {
  handleLeftEdgeSubClick(
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
  );
});

const handleRightEdgeClickAtom = atom(null, (get, set) => {
  handleRightEdgeClick(
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
  );
});

const handleRightEdgeSubClickAtom = atom(null, (get, set) => {
  handleRightEdgeSubClick(
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
  );
});

const handleBottomEdgeClickAtom = atom(null, (get, set) => {
  handleBottomEdgeClick(
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
  );
});

const handleBottomEdgeSubClickAtom = atom(null, (get, set) => {
  handleBottomEdgeSubClick(
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
  );
});

const handleVerticalScrollAtom = atom(null, (get, set, amount: number) => {
  scrollByYPx(
    amount,
    createIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    () => get(userSettingsAtom),
    get(viewerManagerAtom),
  );
});

const handleHorizontalScrollAtom = atom(null, (get, set, amount: number) => {
  scrollByXPx(
    amount,
    createIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    () => get(userSettingsAtom),
    get(viewerManagerAtom),
  );
});

/* -------------------------------------------------------------------------- */

export const TapAreas = (): JSX.Element => {
  const tapAreaSize = useAtomValue(tapAreaSizeAtom);
  const handleLeftEdgeClick = useSetAtom(handleLeftEdgeClickAtom);
  const handleLeftEdgeSubClick = useSetAtom(handleLeftEdgeSubClickAtom);
  const handleRightEdgeClick = useSetAtom(handleRightEdgeClickAtom);
  const handleRightEdgeSubClick = useSetAtom(handleRightEdgeSubClickAtom);
  const handleBottomEdgeClick = useSetAtom(handleBottomEdgeClickAtom);
  const handleBottomEdgeSubClick = useSetAtom(handleBottomEdgeSubClickAtom);
  const handleVerticalScroll = useSetAtom(handleVerticalScrollAtom);
  const handleHorizontalScroll = useSetAtom(handleHorizontalScrollAtom);

  return (
    <>
      {tapAreaSize.height !== SizeEnum.none && (
        <TapArea
          className="inset-x-0 bottom-0"
          style={{
            height: getSizeLength(tapAreaSize.height),
          }}
          onClick={handleBottomEdgeClick}
          onSubClick={handleBottomEdgeSubClick}
          onScroll={(deltaX) => handleHorizontalScroll(deltaX)}
        />
      )}
      {tapAreaSize.width !== SizeEnum.none && (
        <TapArea
          className="inset-y-0 left-0"
          style={{
            width: getSizeLength(tapAreaSize.width),
          }}
          onClick={handleLeftEdgeClick}
          onSubClick={handleLeftEdgeSubClick}
          onScroll={(_, deltaY) => handleVerticalScroll(deltaY)}
        />
      )}
      {tapAreaSize.width !== SizeEnum.none && (
        <TapArea
          className="inset-y-0 right-0"
          style={{
            width: getSizeLength(tapAreaSize.width),
          }}
          onClick={handleRightEdgeClick}
          onSubClick={handleRightEdgeSubClick}
          onScroll={(_, deltaY) => handleVerticalScroll(deltaY)}
        />
      )}
    </>
  );
};

const getSizeLength = (value: SizeValue): string => {
  switch (value) {
    case "none":
      return "0px";
    case "s":
      return "75px";
    case "m":
      return "100px";
    case "l":
      return "125px";
    default:
      exhaustiveCheck(value);
      throw new Error();
  }
};
