import { atom, useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { InfoVisibility } from "../../../application/appState/valueObjects/infoVisibility";
import { IsUserScrolled } from "../../../application/appState/valueObjects/isUserScrolled";
import { moveToLeftPage } from "../../../application/viewer/moveToLeftPage";
import { moveToRightPage } from "../../../application/viewer/moveToRightPage";
import { zoomIn } from "../../../application/viewer/zoomIn";
import { zoomOut } from "../../../application/viewer/zoomOut";
import { FileNavigator } from "../../../domain/models/file/fileNavigator";
import { Notification } from "../../../domain/models/notification/notification";
import { UserSettings } from "../../../domain/models/userSettings/userSettings";
import { ZoomPercentage } from "../../../domain/models/zoom/zoomPercentage";
import {
  Atom,
  fileNavigatorAtom,
  imageSizeAtom,
  infoVisibilityAtom,
  isImageWiderThanViewerAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  viewerManagerAtom,
  zoomPercentageAtom,
} from "../../atoms";
import { ChevronLeft, ChevronRight } from "./items/ChevronIcons";
import { GamepadListener } from "./items/GamepadListener";
import { KeydownListener } from "./items/KeydownListener";
import { LandscapeListener } from "./items/LandscapeListener";
import { Loader } from "./items/Loader";
import { SharpeningFilter } from "./items/SharpeningFilter";
import { TapAreas } from "./items/TapAreas";
import { ViewerBody } from "./items/ViewerBody";
import { ViewerCanvas } from "./items/ViewerCanvas";
import { ViewerContent } from "./items/ViewerContent";

const zoomInAtom = atom(null, (get, set) => {
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
  zoomIn(
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
    zoomPercentageStore,
  );
});

const zoomOutAtom = atom(null, (get, set) => {
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
  zoomOut(
    isUserScrolledStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
    get(viewerManagerAtom),
    zoomPercentageStore,
  );
});

const moveToLeftPageAtom = atom(null, (get, set) => {
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const notificationStore = Notification.getStore(
    () => get(notificationAtom),
    (v) => set(notificationAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  moveToLeftPage(
    fileNavigatorStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
  );
});

const moveToRightPageAtom = atom(null, (get, set) => {
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const notificationStore = Notification.getStore(
    () => get(notificationAtom),
    (v) => set(notificationAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  moveToRightPage(
    fileNavigatorStore,
    notificationStore,
    get(scrollPercentage2DAtom),
    userSettingsStore,
  );
});

export const ImageViewer = (): JSX.Element => {
  const zoomIn = useSetAtom(zoomInAtom);
  const zoomOut = useSetAtom(zoomOutAtom);
  const moveToLeftPage = useSetAtom(moveToLeftPageAtom);
  const moveToRightPage = useSetAtom(moveToRightPageAtom);
  const setInfoVisibility = useSetAtom(infoVisibilityAtom);
  const viewerManager = useAtomValue(viewerManagerAtom);
  const imageSize = useAtomValue(imageSizeAtom);
  const setIsImageWiderThanViewer = useSetAtom(isImageWiderThanViewerAtom);

  const handleResize = (): void => {
    setIsImageWiderThanViewer(
      viewerManager.isImageWiderThanViewer(imageSize.width, imageSize.height),
    );
  };

  const handleClick = (): void => {
    setInfoVisibility((v) => InfoVisibility.toggle(v));
  };

  return (
    <>
      <SharpeningFilter.Component />
      <GamepadListener />
      <KeydownListener />
      <LandscapeListener />
      <ViewerBody
        onResize={handleResize}
        onClick={handleClick}
        onDoubleClick={zoomIn}
        onSubClick={zoomOut}
        onLeftSidePull={moveToLeftPage}
        onRightSidePull={moveToRightPage}
      >
        <ViewerContent>
          <ViewerCanvas />
        </ViewerContent>
      </ViewerBody>
      <TapAreas />
      <ChevronLeft />
      <ChevronRight />
      <Loader />
    </>
  );
};
