import { createEffect, createSignal, onCleanup } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { ClickGestureManager } from "../../../../infrastructure/viewer/clickGestureManager";
import { SmoothScroll } from "../../../../infrastructure/viewer/smoothScroll";
import { TouchMoveManager } from "../../../../infrastructure/viewer/touchMoveManager";
import { userSettingsStore } from "../../../signals";
import { joinObjectValues } from "../../utils/joinObjectValues";

export const TapArea = (props: {
  className: string;
  style: JSX.CSSProperties;
  onClick: () => void;
  onSubClick: () => void;
  onScroll: (deltaX: number, deltaY: number) => void;
}): JSX.Element => {
  // oxlint-disable-next-line no-unassigned-vars
  let divRef: HTMLDivElement | undefined;
  let timerId: number | undefined;
  const clickGestureManager = new ClickGestureManager();
  let smoothScroll = new SmoothScroll();
  let touchMoveManager = new TouchMoveManager(0, 0);
  const [userSettings] = userSettingsStore;
  const [isActive, setIsActive] = createSignal(false);

  createEffect(() => {
    if (divRef == null) return;

    const handleTouchMove = (ev: TouchEvent): void => {
      ev.preventDefault(); // 背景要素にスクロールイベントを伝播させない

      const { clientX, clientY } = ev.targetTouches[0];
      if (!touchMoveManager.isScrolled(clientX, clientY)) return;

      clickGestureManager.cancelLongPress();
      let delta = touchMoveManager.getDelta(clientX, clientY);
      if (userSettings.isSmoothScrollEnabled) {
        smoothScroll.push(delta.x, delta.y);
        delta = smoothScroll.getAverageDelta();
      }
      props.onScroll(delta.x, delta.y);
    };

    const handleWheel = (ev: WheelEvent): void => {
      ev.preventDefault(); // 背景要素にホイールイベントを伝播させない

      let delta = { x: ev.deltaX, y: ev.deltaY };
      if (userSettings.isSmoothScrollEnabled) {
        smoothScroll.push(delta.x, delta.y);
        delta = smoothScroll.getAverageDelta();
      }
      props.onScroll(delta.x, delta.y);
      setIsActive(true);
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        smoothScroll = new SmoothScroll();
        setIsActive(false);
      }, 100);
    };

    const option: AddEventListenerOptions = { passive: false };
    divRef.addEventListener("touchmove", handleTouchMove, option);
    divRef.addEventListener("wheel", handleWheel, option);

    onCleanup(() => {
      divRef.removeEventListener("touchmove", handleTouchMove, option);
      divRef.removeEventListener("wheel", handleWheel, option);
    });
  });

  const handleClick = (): void => {
    clickGestureManager.onClick(props.onClick);
  };

  const handleContextMenu = (ev: PointerEvent): void => {
    ev.preventDefault(); // ブラウザデフォルトのメニューを開かない
    clickGestureManager.onSubClick(props.onSubClick);
  };

  const handleTouchStart = (ev: TouchEvent): void => {
    const { clientX, clientY } = ev.targetTouches[0];
    touchMoveManager = new TouchMoveManager(clientX, clientY);
    clickGestureManager.reset();
    clickGestureManager.onLongPress(props.onSubClick, userSettings.longPressRecognitionTime);
    smoothScroll = new SmoothScroll();
  };

  const handleTouchEnd = (): void => {
    clickGestureManager.cancelLongPress();
  };

  const className = {
    _: "fixed transition select-none",
    activeBg: "active:bg-blue-500/15",
    activeBg2: isActive() ? "bg-blue-500/15" : "",
    props: props.className,
  };

  return (
    <div
      class={joinObjectValues(className)}
      style={props.style}
      ref={divRef}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );
};
