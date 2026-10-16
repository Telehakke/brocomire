import { atom, useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import * as InfoVisibility from "../../../application/appState/infoVisibility";
import * as IsImageWiderThanViewer from "../../../application/appState/isImageWiderThanViewer";
import * as IsUserScrolled from "../../../application/appState/isUserScrolled";
import { moveToLeftPage } from "../../../application/viewer/moveToLeftPage";
import { moveToRightPage } from "../../../application/viewer/moveToRightPage";
import { zoomIn } from "../../../application/viewer/zoomIn";
import { zoomOut } from "../../../application/viewer/zoomOut";
import * as FileNavigator from "../../../domain/models/file/fileNavigator";
import * as Notification from "../../../domain/models/notification/notification";
import * as ZoomPercentage from "../../../domain/models/zoom/zoomPercentage";
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
import { ProgressBar } from "./items/ProgressBar";
import { SharpeningFilter } from "./items/SharpeningFilter";
import { TapAreas } from "./items/TapAreas";
import { ViewerBody } from "./items/ViewerBody";
import { ViewerCanvas } from "./items/ViewerCanvas";
import { ViewerContent } from "./items/ViewerContent";

const zoomInAtom = atom(null, (get, set) => {
  zoomIn({
    isUserScrolledStore: IsUserScrolled.getStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    notificationStore: Notification.getStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
    viewerManager: get(viewerManagerAtom),
    zoomPercentageStore: ZoomPercentage.getStore(
      () => get(zoomPercentageAtom),
      (v) => set(zoomPercentageAtom, v),
    ),
  });
});

const zoomOutAtom = atom(null, (get, set) => {
  zoomOut({
    isUserScrolledStore: IsUserScrolled.getStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    notificationStore: Notification.getStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
    viewerManager: get(viewerManagerAtom),
    zoomPercentageStore: ZoomPercentage.getStore(
      () => get(zoomPercentageAtom),
      (v) => set(zoomPercentageAtom, v),
    ),
  });
});

const moveToLeftPageAtom = atom(null, (get, set) => {
  moveToLeftPage({
    fileNavigatorStore: FileNavigator.getStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    notificationStore: Notification.getStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
  });
});

const moveToRightPageAtom = atom(null, (get, set) => {
  moveToRightPage({
    fileNavigatorStore: FileNavigator.getStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    notificationStore: Notification.getStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
  });
});

export const ImageViewer = (): JSX.Element => {
  const imageSize = useAtomValue(imageSizeAtom);
  const viewerManager = useAtomValue(viewerManagerAtom);
  const moveToLeftPage = useSetAtom(moveToLeftPageAtom);
  const moveToRightPage = useSetAtom(moveToRightPageAtom);
  const setInfoVisibility = useSetAtom(infoVisibilityAtom);
  const setIsImageWiderThanViewer = useSetAtom(isImageWiderThanViewerAtom);
  const zoomIn = useSetAtom(zoomInAtom);
  const zoomOut = useSetAtom(zoomOutAtom);

  const handleResize = (): void => {
    setIsImageWiderThanViewer(
      IsImageWiderThanViewer.create(
        viewerManager.isImageWiderThanViewer(imageSize.width, imageSize.height),
      ),
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
      <ProgressBar />
    </>
  );
};
