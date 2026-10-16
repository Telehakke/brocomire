import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, type JSX, type ReactNode } from "react";
import * as ChevronMark from "../../../../application/appState/chevronMark";
import * as IsUserScrolled from "../../../../application/appState/isUserScrolled";
import { ClickGestureManager } from "../../../../infrastructure/viewer/clickGestureManager";
import { PullManager } from "../../../../infrastructure/viewer/pullManager";
import { TouchMoveManager } from "../../../../infrastructure/viewer/touchMoveManager";
import {
  chevronMarkAtom,
  isUserScrolledAtom,
  UserSettingsAtom,
  viewerManagerAtom,
} from "../../../atoms";

export type Body = HTMLDivElement | null;

export const ViewerBody = (props: {
  onResize: () => void;
  onClick: () => void;
  onDoubleClick: () => void;
  onSubClick: () => void;
  onLeftSidePull: () => void;
  onRightSidePull: () => void;
  children: ReactNode;
}): JSX.Element => {
  const bodyRef = useRef<Body>(null);
  const clickGestureManager = useRef(new ClickGestureManager());
  const pullManager = useRef(new PullManager());
  const touchMoveManager = useRef(new TouchMoveManager(0, 0));
  const longPressRecognitionTime = useAtomValue(UserSettingsAtom.longPressRecognitionTime);
  const viewerManager = useAtomValue(viewerManagerAtom);
  const setChevronMark = useSetAtom(chevronMarkAtom);
  const setIsUserScrolled = useSetAtom(isUserScrolledAtom);

  useEffect(() => {
    const body = bodyRef.current;
    if (body == null) return;

    viewerManager.setBody(() => body);
  }, [viewerManager]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body == null) return;

    // リサイズされるとonResize()を呼び出す
    const observer = new ResizeObserver(props.onResize);
    observer.observe(body);
    return (): void => observer.disconnect();
  }, [bodyRef, props.onResize]);

  const handleClick = (): void => {
    clickGestureManager.current.onClick(props.onClick, props.onDoubleClick);
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
    pullManager.current.reset();
  };

  const handleTouchMove = (ev: React.TouchEvent<HTMLDivElement>): void => {
    const { clientX, clientY } = ev.targetTouches[0];
    if (!touchMoveManager.current.isScrolled(clientX, clientY)) return;

    clickGestureManager.current.cancelLongPress();
    if (viewerManager.isReachedLimitX()) {
      pullManager.current.add(touchMoveManager.current.getDeltaX(clientX));
    } else {
      pullManager.current.reset();
    }
    setChevronMark(pullManager.current.getChevronMark());
    setIsUserScrolled(IsUserScrolled.create(true));
  };

  const handleTouchEnd = (): void => {
    clickGestureManager.current.cancelLongPress();
    pullManager.current.onLeftSidePull(props.onLeftSidePull);
    pullManager.current.onRightSidePull(props.onRightSidePull);
    setChevronMark(ChevronMark.create("none"));
  };

  const handleWheel = (): void => {
    setIsUserScrolled(IsUserScrolled.create(true));
  };

  return (
    <div
      className="fixed inset-0 h-dvh w-dvw scrollbar-none overflow-scroll overscroll-none bg-black select-none"
      ref={bodyRef}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {props.children}
    </div>
  );
};
