import type { JSX } from "solid-js/jsx-runtime";
import {
  createInfoVisibility,
  InfoVisibilityEnum,
} from "../../../application/appState/infoVisibility";
import { createIsImageWiderThanViewer } from "../../../application/appState/isImageWiderThanViewer";
import { moveToLeftPage } from "../../../application/viewer/moveToLeftPage";
import { moveToRightPage } from "../../../application/viewer/moveToRightPage";
import { zoomIn } from "../../../application/viewer/zoomIn";
import { zoomOut } from "../../../application/viewer/zoomOut";
import {
  fileNavigatorSignal,
  imageSizeSignal,
  infoVisibilitySignal,
  isImageWiderThanViewerSignal,
  isUserScrolledSignal,
  notificationSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
  zoomPercentageSignal,
} from "../../signals";
import { ChevronLeft, ChevronRight } from "./items/ChevronIcons";
import { GamepadListener } from "./items/GamepadListener";
import { KeydownListener } from "./items/KeydownListener";
import { LandscapeListener } from "./items/LandscapeListener";
import { Loader } from "./items/Loader";
import { TapAreas } from "./items/TapAreas";
import { ViewerBody } from "./items/ViewerBody";
import { ViewerCanvas } from "./items/ViewerCanvas";
import { ViewerContent } from "./items/ViewerContent";

export const ImageViewer = (): JSX.Element => {
  const [imageSize] = imageSizeSignal;
  const [, setInfoVisibility] = infoVisibilitySignal;
  const [, setIsImageWiderThanViewer] = isImageWiderThanViewerSignal;
  const [viewerManager] = viewerManagerSignal;

  const handleResize = (): void => {
    setIsImageWiderThanViewer(
      createIsImageWiderThanViewer(
        viewerManager().isImageWiderThanViewer(imageSize().width, imageSize().height),
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
        onDoubleClick={runZoomIn}
        onSubClick={runZoomOut}
        onLeftSidePull={runMoveToLeftPage}
        onRightSidePull={runMoveToRightPage}
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

const runZoomIn = (): void => {
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;
  const [zoomPercentage, setZoomPercentage] = zoomPercentageSignal;

  zoomIn(
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
    () => zoomPercentage(),
    (v) => setZoomPercentage(v),
  );
};

const runZoomOut = (): void => {
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;
  const [zoomPercentage, setZoomPercentage] = zoomPercentageSignal;

  zoomOut(
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
    () => zoomPercentage(),
    (v) => setZoomPercentage(v),
  );
};

const runMoveToLeftPage = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;

  moveToLeftPage(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
  );
};

const runMoveToRightPage = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;

  moveToRightPage(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
  );
};
