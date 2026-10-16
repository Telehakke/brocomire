import { useAtomValue } from "jotai";
import { useEffect, useRef, useState, type CSSProperties, type JSX } from "react";
import { ClickGestureManager } from "../../../../infrastructure/viewer/clickGestureManager";
import { SmoothScroll } from "../../../../infrastructure/viewer/smoothScroll";
import { TouchMoveManager } from "../../../../infrastructure/viewer/touchMoveManager";
import { UserSettingsAtom } from "../../../atoms";

export const TapArea = (props: {
  className: string;
  style: CSSProperties;
  onClick: () => void;
  onSubClick: () => void;
  onScroll: (deltaX: number, deltaY: number) => void;
}): JSX.Element => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const timerId = useRef<number | undefined>(undefined);
  const clickGestureManager = useRef(new ClickGestureManager());
  const smoothScroll = useRef(new SmoothScroll());
  const touchMoveManager = useRef(new TouchMoveManager(0, 0));
  const longPressRecognitionTime = useAtomValue(UserSettingsAtom.longPressRecognitionTime);
  const isSmoothScrollEnabled = useAtomValue(UserSettingsAtom.isSmoothScrollEnabled);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const div = divRef.current;
    if (div == null) return;

    const handleTouchMove = (ev: TouchEvent): void => {
      ev.preventDefault(); // 背景要素にスクロールイベントを伝播させない

      const { clientX, clientY } = ev.targetTouches[0];
      if (!touchMoveManager.current.isScrolled(clientX, clientY)) return;

      clickGestureManager.current.cancelLongPress();
      let delta = touchMoveManager.current.getDelta(clientX, clientY);
      if (isSmoothScrollEnabled) {
        smoothScroll.current.push(delta.x, delta.y);
        delta = smoothScroll.current.getAverageDelta();
      }
      props.onScroll(delta.x, delta.y);
    };

    const handleWheel = (ev: WheelEvent): void => {
      ev.preventDefault(); // 背景要素にホイールイベントを伝播させない

      let delta = { x: ev.deltaX, y: ev.deltaY };
      if (isSmoothScrollEnabled) {
        smoothScroll.current.push(delta.x, delta.y);
        delta = smoothScroll.current.getAverageDelta();
      }
      props.onScroll(delta.x, delta.y);
      setIsActive(true);
      window.clearTimeout(timerId.current);
      timerId.current = window.setTimeout(() => {
        smoothScroll.current = new SmoothScroll();
        setIsActive(false);
      }, 100);
    };

    const option: AddEventListenerOptions = { passive: false };
    div.addEventListener("touchmove", handleTouchMove, option);
    div.addEventListener("wheel", handleWheel, option);
    return (): void => {
      div.removeEventListener("touchmove", handleTouchMove, option);
      div.removeEventListener("wheel", handleWheel, option);
    };
  }, [isSmoothScrollEnabled, props]);

  const handleClick = (): void => {
    clickGestureManager.current.onClick(props.onClick);
  };

  const handleContextMenu = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    ev.preventDefault(); // ブラウザデフォルトのメニューを開かない
    clickGestureManager.current.onSubClick(props.onSubClick);
  };

  const handleTouchStart = (ev: React.TouchEvent<HTMLDivElement>): void => {
    const { clientX, clientY } = ev.targetTouches[0];
    touchMoveManager.current = new TouchMoveManager(clientX, clientY);
    clickGestureManager.current.reset();
    clickGestureManager.current.onLongPress(props.onSubClick, longPressRecognitionTime);
    smoothScroll.current = new SmoothScroll();
  };

  const handleTouchEnd = (): void => {
    clickGestureManager.current.cancelLongPress();
  };

  const className = {
    _: "fixed transition select-none",
    activeBg: "active:bg-blue-500/15",
    activeBg2: isActive ? "bg-blue-500/15" : "",
    props: props.className,
  };

  return (
    <div
      className={Object.values(className).join(" ")}
      style={props.style}
      ref={divRef}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );
};
