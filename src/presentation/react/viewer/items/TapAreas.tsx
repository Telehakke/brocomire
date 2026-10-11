import { atom, useAtomValue, useSetAtom } from "jotai";
import { type JSX } from "react";
import { IsUserScrolled } from "../../../../application/appState/valueObjects/isUserScrolled";
import { handleBottomEdgeClick } from "../../../../application/viewer/handleBottomEdgeClick";
import { handleBottomEdgeSubClick } from "../../../../application/viewer/handleBottomEdgeSubClick";
import { handleLeftEdgeClick } from "../../../../application/viewer/handleLeftEdgeClick";
import { handleLeftEdgeSubClick } from "../../../../application/viewer/handleLeftEdgeSubClick";
import { handleRightEdgeClick } from "../../../../application/viewer/handleRightEdgeClick";
import { handleRightEdgeSubClick } from "../../../../application/viewer/handleRightEdgeSubClick";
import { scrollByXPx } from "../../../../application/viewer/scrollByXPx";
import { scrollByYPx } from "../../../../application/viewer/scrollByYPx";
import { FileNavigator } from "../../../../domain/models/file/fileNavigator";
import { Notification } from "../../../../domain/models/notification/notification";
import { UserSettings } from "../../../../domain/models/userSettings/userSettings";
import { type SizeType } from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import {
  Atom,
  fileNavigatorAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  UserSettingsAtom,
  viewerManagerAtom,
} from "../../../atoms";
import { TapArea } from "./TapArea";

const handleLeftEdgeClickAtom = atom(null, (get, set) => {
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
  handleLeftEdgeClick(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
  );
});

const handleLeftEdgeSubClickAtom = atom(null, (get, set) => {
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
  handleLeftEdgeSubClick(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
  );
});

const handleRightEdgeClickAtom = atom(null, (get, set) => {
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
  handleRightEdgeClick(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
  );
});

const handleRightEdgeSubClickAtom = atom(null, (get, set) => {
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
  handleRightEdgeSubClick(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
  );
});

const handleBottomEdgeClickAtom = atom(null, (get, set) => {
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
  handleBottomEdgeClick(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
  );
});

const handleBottomEdgeSubClickAtom = atom(null, (get, set) => {
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
  handleBottomEdgeSubClick(
    fileNavigatorStore,
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
  );
});

const handleVerticalScrollAtom = atom(null, (get, set, amount: number) => {
  const isUserScrolledStore = IsUserScrolled.getStore(
    () => get(isUserScrolledAtom),
    (v) => set(isUserScrolledAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  scrollByYPx(amount, isUserScrolledStore, userSettingsStore, get(viewerManagerAtom));
});

const handleHorizontalScrollAtom = atom(null, (get, set, amount: number) => {
  const isUserScrolledStore = IsUserScrolled.getStore(
    () => get(isUserScrolledAtom),
    (v) => set(isUserScrolledAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  scrollByXPx(amount, isUserScrolledStore, userSettingsStore, get(viewerManagerAtom));
});

export const TapAreas = (): JSX.Element => {
  const tapAreaSize = useAtomValue(UserSettingsAtom.tapAreaSize);
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
      <TapArea
        className="inset-x-0 bottom-0"
        style={{
          height: getSizeLength(tapAreaSize.height),
        }}
        onClick={handleBottomEdgeClick}
        onSubClick={handleBottomEdgeSubClick}
        onScroll={(deltaX) => handleHorizontalScroll(deltaX)}
      />
      <TapArea
        className="inset-y-0 left-0"
        style={{
          width: getSizeLength(tapAreaSize.height),
        }}
        onClick={handleLeftEdgeClick}
        onSubClick={handleLeftEdgeSubClick}
        onScroll={(_, deltaY) => handleVerticalScroll(deltaY)}
      />
      <TapArea
        className="inset-y-0 right-0"
        style={{
          width: getSizeLength(tapAreaSize.height),
        }}
        onClick={handleRightEdgeClick}
        onSubClick={handleRightEdgeSubClick}
        onScroll={(_, deltaY) => handleVerticalScroll(deltaY)}
      />
    </>
  );
};

const getSizeLength = (value: SizeType): string => {
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
