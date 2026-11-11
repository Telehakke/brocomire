import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { handleBottomEdgeClick } from "../../../../application/viewer/handleBottomEdgeClick";
import { handleBottomEdgeSubClick } from "../../../../application/viewer/handleBottomEdgeSubClick";
import { handleLeftEdgeClick } from "../../../../application/viewer/handleLeftEdgeClick";
import { handleLeftEdgeSubClick } from "../../../../application/viewer/handleLeftEdgeSubClick";
import { handleRightEdgeClick } from "../../../../application/viewer/handleRightEdgeClick";
import { handleRightEdgeSubClick } from "../../../../application/viewer/handleRightEdgeSubClick";
import { scrollByXPx } from "../../../../application/viewer/scrollByXPx";
import { scrollByYPx } from "../../../../application/viewer/scrollByYPx";
import {
  SizeEnum,
  type SizeValue,
} from "../../../../domain/models/userSettings/valueObjects/tapAreaSize";
import { exhaustiveCheck } from "../../../../domain/models/utils/exhaustiveCheck";
import {
  fileNavigatorSignal,
  isUserScrolledSignal,
  notificationSignal,
  scrollPercentage2DSignal,
  userSettingsStore,
  viewerManagerSignal,
} from "../../../signals";
import { TapArea } from "./TapArea";

export const TapAreas = (): JSX.Element => {
  const [userSettings] = userSettingsStore;

  return (
    <>
      <Show when={userSettings.tapAreaSize.height !== SizeEnum.none}>
        <TapArea
          className="inset-x-0 bottom-0"
          style={{
            height: getSizeLength(userSettings.tapAreaSize.height),
          }}
          onClick={runHandleBottomEdgeClick}
          onSubClick={runHandleBottomEdgeSubClick}
          onScroll={(deltaX) => runHandleHorizontalScroll(deltaX)}
        />
      </Show>
      <Show when={userSettings.tapAreaSize.width !== SizeEnum.none}>
        <TapArea
          className="inset-y-0 left-0"
          style={{
            width: getSizeLength(userSettings.tapAreaSize.width),
          }}
          onClick={runHandleLeftEdgeClick}
          onSubClick={runHandleLeftEdgeSubClick}
          onScroll={(_, deltaY) => runHandleVerticalScroll(deltaY)}
        />
      </Show>
      <Show when={userSettings.tapAreaSize.width !== SizeEnum.none}>
        <TapArea
          className="inset-y-0 right-0"
          style={{
            width: getSizeLength(userSettings.tapAreaSize.width),
          }}
          onClick={runHandleRightEdgeClick}
          onSubClick={runHandleRightEdgeSubClick}
          onScroll={(_, deltaY) => runHandleVerticalScroll(deltaY)}
        />
      </Show>
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

/* -------------------------------------------------------------------------- */

const runHandleLeftEdgeClick = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  handleLeftEdgeClick(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
  );
};

const runHandleLeftEdgeSubClick = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  handleLeftEdgeSubClick(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
  );
};

const runHandleRightEdgeClick = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  handleRightEdgeClick(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
  );
};

const runHandleRightEdgeSubClick = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  handleRightEdgeSubClick(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
  );
};

const runHandleBottomEdgeClick = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  handleBottomEdgeClick(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
  );
};

const runHandleBottomEdgeSubClick = (): void => {
  const [fileNavigator, setFileNavigator] = fileNavigatorSignal;
  const [isUserScrolled, setIsUserScrolled] = isUserScrolledSignal;
  const [, setNotification] = notificationSignal;
  const [scrollPercentage2D] = scrollPercentage2DSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  handleBottomEdgeSubClick(
    () => fileNavigator(),
    (v) => setFileNavigator(v),
    () => isUserScrolled(),
    (v) => setIsUserScrolled(v),
    (v) => setNotification(v),
    scrollPercentage2D(),
    () => userSettings,
    viewerManager(),
  );
};

const runHandleVerticalScroll = (amount: number): void => {
  const [, setIsUserScrolled] = isUserScrolledSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  scrollByYPx(
    amount,
    (v) => setIsUserScrolled(v),
    () => userSettings,
    viewerManager(),
  );
};

const runHandleHorizontalScroll = (amount: number): void => {
  const [, setIsUserScrolled] = isUserScrolledSignal;
  const [userSettings] = userSettingsStore;
  const [viewerManager] = viewerManagerSignal;

  scrollByXPx(
    amount,
    (v) => setIsUserScrolled(v),
    () => userSettings,
    viewerManager(),
  );
};
