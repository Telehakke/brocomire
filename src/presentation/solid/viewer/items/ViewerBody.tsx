import { createEffect, onMount } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createChevronMark } from "../../../../application/appState/chevronMark";
import { createIsUserScrolled } from "../../../../application/appState/isUserScrolled";
import { ClickGestureManager } from "../../../../infrastructure/viewer/clickGestureManager";
import { PullManager } from "../../../../infrastructure/viewer/pullManager";
import { TouchMoveManager } from "../../../../infrastructure/viewer/touchMoveManager";
import {
  chevronMarkSignal,
  isUserScrolledSignal,
  userSettingsStore,
  viewerManagerSignal,
} from "../../../signals";

export const ViewerBody = (props: {
  onResize: () => void;
  onClick: () => void;
  onDoubleClick: () => void;
  onSubClick: () => void;
  onLeftSidePull: () => void;
  onRightSidePull: () => void;
  children: JSX.Element;
}): JSX.Element => {
  // oxlint-disable-next-line no-unassigned-vars
  let bodyRef: HTMLDivElement | undefined;
  let canTouch = false;
  const clickGestureManager = new ClickGestureManager();
  const pullManager = new PullManager();
  let touchMoveManager = new TouchMoveManager(0, 0);
  const [viewerManager] = viewerManagerSignal;
  const [, setChevronMark] = chevronMarkSignal;
  const [, setIsUserScrolled] = isUserScrolledSignal;
  const [userSettings] = userSettingsStore;

  onMount(() => {
    if (bodyRef == null) return;

    viewerManager().setBody(() => bodyRef);
  });

  createEffect(() => {
    if (bodyRef == null) return;

    // リサイズされるとonResize()を呼び出す
    const observer = new ResizeObserver(props.onResize);
    observer.observe(bodyRef);
    return (): void => observer.disconnect();
  });

  const handleTouchStart = (ev: TouchEvent): void => {
    canTouch = true;
    const { clientX, clientY } = ev.targetTouches[0];
    touchMoveManager = new TouchMoveManager(clientX, clientY);
    clickGestureManager.reset();
    clickGestureManager.onLongPress(props.onSubClick, userSettings.longPressRecognitionTime);
    pullManager.reset();
  };

  const handleTouchMove = (ev: TouchEvent): void => {
    const { clientX, clientY } = ev.targetTouches[0];
    if (!touchMoveManager.isScrolled(clientX, clientY)) return;

    clickGestureManager.cancelClick();
    clickGestureManager.cancelLongPress();
    if (viewerManager().isReachedLimitX()) {
      pullManager.add(touchMoveManager.getDeltaX(clientX));
    } else {
      pullManager.reset();
    }
    setChevronMark(pullManager.getChevronMark());
    setIsUserScrolled(createIsUserScrolled(true));
  };

  const handleTouchEnd = (): void => {
    clickGestureManager.onClick(props.onClick, props.onDoubleClick);
    clickGestureManager.cancelLongPress();
    pullManager.onLeftSidePull(props.onLeftSidePull);
    pullManager.onRightSidePull(props.onRightSidePull);
    setChevronMark(createChevronMark("none"));
  };

  const handleClick = (): void => {
    if (canTouch) return;
    clickGestureManager.onClick(props.onClick, props.onDoubleClick);
  };

  const handleContextMenu = (ev: PointerEvent): void => {
    ev.preventDefault(); // ブラウザデフォルトのメニューを開かない
    clickGestureManager.onSubClick(props.onSubClick);
  };

  const handleWheel = (): void => {
    setIsUserScrolled(createIsUserScrolled(true));
  };

  return (
    <div
      class="fixed inset-0 h-dvh w-dvw scrollbar-none overflow-scroll overscroll-none bg-black select-none"
      ref={bodyRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onWheel={handleWheel}
    >
      {props.children}
    </div>
  );
};
