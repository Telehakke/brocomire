import { atom, useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import {
  createInfoVisibility,
  InfoVisibilityEnum,
} from "../../../application/appState/infoVisibility";
import { createIsImageWiderThanViewer } from "../../../application/appState/isImageWiderThanViewer";
import { createIsUserScrolledStore } from "../../../application/appState/isUserScrolled";
import { moveToLeftPage } from "../../../application/viewer/moveToLeftPage";
import { moveToRightPage } from "../../../application/viewer/moveToRightPage";
import { zoomIn } from "../../../application/viewer/zoomIn";
import { zoomOut } from "../../../application/viewer/zoomOut";
import { createFileNavigatorStore } from "../../../domain/models/file/fileNavigator";
import { createNotificationStore } from "../../../domain/models/notification/notification";
import { createZoomPercentageStore } from "../../../domain/models/zoom/zoomPercentage";
import {
  fileNavigatorAtom,
  imageSizeAtom,
  infoVisibilityAtom,
  isImageWiderThanViewerAtom,
  isUserScrolledAtom,
  notificationAtom,
  scrollPercentage2DAtom,
  userSettingsAtom,
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
  zoomIn(
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

const zoomOutAtom = atom(null, (get, set) => {
  zoomOut(
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

const moveToLeftPageAtom = atom(null, (get, set) => {
  moveToLeftPage(
    createFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    createNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    get(scrollPercentage2DAtom),
    () => get(userSettingsAtom),
  );
});

const moveToRightPageAtom = atom(null, (get, set) => {
  moveToRightPage(
    createFileNavigatorStore(
      () => get(fileNavigatorAtom),
      (v) => set(fileNavigatorAtom, v),
    ),
    createNotificationStore(
      () => get(notificationAtom),
      (v) => set(notificationAtom, v),
    ),
    get(scrollPercentage2DAtom),
    () => get(userSettingsAtom),
  );
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
