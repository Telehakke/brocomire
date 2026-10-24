import { atom, useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import {
  createInfoVisibility,
  InfoVisibilityEnum,
} from "../../../application/appState/infoVisibility";
import { createIsImageWiderThanViewer } from "../../../application/appState/isImageWiderThanViewer";
import { getIsUserScrolledStore } from "../../../application/appState/isUserScrolled";
import { moveToLeftPage } from "../../../application/viewer/moveToLeftPage";
import { moveToRightPage } from "../../../application/viewer/moveToRightPage";
import { zoomIn } from "../../../application/viewer/zoomIn";
import { zoomOut } from "../../../application/viewer/zoomOut";
import { getFileNavigatorStore } from "../../../domain/models/file/fileNavigator";
import { getNotificationStore } from "../../../domain/models/notification/notification";
import { getZoomPercentageStore } from "../../../domain/models/zoom/zoomPercentage";
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
import { TapAreas } from "./items/TapAreas";
import { ViewerBody } from "./items/ViewerBody";
import { ViewerCanvas } from "./items/ViewerCanvas";
import { ViewerContent } from "./items/ViewerContent";

const zoomInAtom = atom(null, (get, set) => {
  zoomIn({
    isUserScrolledStore: getIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    notificationStore: getNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
    viewerManager: get(viewerManagerAtom),
    zoomPercentageStore: getZoomPercentageStore(
      () => get(zoomPercentageAtom),
      (v) => set(zoomPercentageAtom, v),
    ),
  });
});

const zoomOutAtom = atom(null, (get, set) => {
  zoomOut({
    isUserScrolledStore: getIsUserScrolledStore(
      () => get(isUserScrolledAtom),
      (v) => set(isUserScrolledAtom, v),
    ),
    notificationStore: getNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
    viewerManager: get(viewerManagerAtom),
    zoomPercentageStore: getZoomPercentageStore(
      () => get(zoomPercentageAtom),
      (v) => set(zoomPercentageAtom, v),
    ),
  });
});

const moveToLeftPageAtom = atom(null, (get, set) => {
  moveToLeftPage({
    fileNavigatorStore: getFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    notificationStore: getNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    scrollPercentage2D: get(scrollPercentage2DAtom),
    userSettingsGetter: () => get(Atom.userSettings),
  });
});

const moveToRightPageAtom = atom(null, (get, set) => {
  moveToRightPage({
    fileNavigatorStore: getFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    notificationStore: getNotificationStore(
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
      createIsImageWiderThanViewer(
        viewerManager.isImageWiderThanViewer(imageSize.width, imageSize.height),
      ),
    );
  };

  const handleClick = (): void => {
    setInfoVisibility((v) =>
      v === InfoVisibilityEnum.visible
        ? createInfoVisibility("fade-out")
        : createInfoVisibility("visible"),
    );
  };

  return (
    <>
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
